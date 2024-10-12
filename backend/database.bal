import ballerina/file;
import ballerina/http;
import ballerina/sql;
import ballerinax/h2.driver as _;
import ballerinax/java.jdbc;

# Description.
public class Database {
    private string dbPath;
    private string jdbcUrl;
    private final sql:Client dbClient;

    isolated function init(string databaseName) returns error? {
        self.dbPath = check file:getAbsolutePath("databases");
        self.jdbcUrl = string `jdbc:h2:${self.dbPath}/${databaseName}`;
        self.dbClient = check new jdbc:Client(self.jdbcUrl);

        // Create the USERS table
        _ = check self.dbClient->execute(`
        CREATE TABLE IF NOT EXISTS ADMINS (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        EMAIL VARCHAR(255) UNIQUE NOT NULL,
        PASSWORD VARCHAR(50) NOT NULL
        )`);

        // Create the ELECTIONS table with DATETIME for start and end times
        _ = check self.dbClient->execute(`
        CREATE TABLE IF NOT EXISTS ELECTIONS (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        NAME VARCHAR(255) UNIQUE NOT NULL,
        START_DATE DATETIME NOT NULL,
        END_DATE DATETIME NOT NULL
        )`);

        // Create the CANDIDATES table with a composite unique key on (ELECTION_ID, NUMBER)
        _ = check self.dbClient->execute(`
        CREATE TABLE IF NOT EXISTS CANDIDATES (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        ELECTION_ID INT NOT NULL,
        NUMBER INT NOT NULL,
        NAME VARCHAR(255) NOT NULL,
        VOTES INT DEFAULT 0,
        FOREIGN KEY (ELECTION_ID) REFERENCES ELECTIONS(ID) ON DELETE CASCADE,
        UNIQUE (ELECTION_ID, NUMBER)  -- Composite unique key to ensure unique numbers per election
        )`);

        // Create the VOTERS table with a foreign key to ELECTIONS
        _ = check self.dbClient->execute(`
        CREATE TABLE IF NOT EXISTS VOTERS (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        ELECTION_ID INT,
        NAME VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) NOT NULL,
        NIC VARCHAR(50) NOT NULL,
        HASVOTE BOOL DEFAULT FALSE,
        FOREIGN KEY (ELECTION_ID) REFERENCES ELECTIONS(ID) ON DELETE CASCADE,
        UNIQUE (ELECTION_ID, NIC, EMAIL)
        )`);
    }

    // Create a new election according to NewElection Record.
    isolated function createElection(NewElection newElection) returns ElectionAdded|http:BadRequest|error {
        // Prepare the SQL query to insert the new election
        sql:ParameterizedQuery query = `INSERT INTO ELECTIONS (NAME, START_DATE, END_DATE) 
                                    VALUES (${newElection.name}, ${newElection.startDate}, ${newElection.endDate})`;

        // Execute the query
        sql:ExecutionResult result = check self.dbClient->execute(query);

        // Retrieve the last inserted ID (the election ID)
        string|int? id = result.lastInsertId;
        return id is int ? <ElectionAdded>{body: {...newElection, id: id}} : error("Error occurred while retriving the candidate id");

    }

    // Get the all of election that are already created.
    isolated function getElections() returns Election[]|error {
        sql:ParameterizedQuery query = `SELECT * FROM ELECTIONS`;
        stream<Election, sql:Error?> electionStream = self.dbClient->query(query);
        return from Election election in electionStream
            select election;
    }

    isolated function getElegibleList(string voterNIC) returns Election[]|error {
        sql:ParameterizedQuery query = `SELECT E.ID,E.NAME,E.END_DATE,E.START_DATE FROM ELECTIONS E INNER JOIN VOTERS V ON V.ELECTION_ID = E.ID AND V.NIC = ${voterNIC}`;
        stream<Election, sql:Error?> electionStream = self.dbClient->query(query);
        return from Election election in electionStream
            select election;
    }

    // Get all the candidates matching with given election.
    isolated function getCandidates(string election_id) returns Candidate[]|error {
        sql:ParameterizedQuery query = `SELECT * FROM CANDIDATES WHERE ELECTION_ID = ${election_id}`;
        stream<Candidate, sql:Error?> candidateStream = self.dbClient->query(query);
        return from Candidate candidate in candidateStream
            select candidate;
    }

    // Get all the voters matching with given election.
    isolated function getVoters(string election_id) returns Voter[]|error {
        sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE ELECTION_ID = ${election_id}`;
        stream<Voter, sql:Error?> voterStream = self.dbClient->query(query);
        return from Voter voter in voterStream
            select voter;
    }

    isolated function getTotalAssignedVoters(string electionId) returns int|error {

        // SQL query to count the total number of assigned voters for the specified election
        sql:ParameterizedQuery query = `SELECT COUNT(*) AS total FROM VOTERS WHERE ELECTION_ID = ${electionId}`;

        // Execute the query and get the result
        int|error totalAssignedVoters = self.dbClient->queryRow(query);

        // Check if we successfully retrieved the count
        if totalAssignedVoters is int {
            return totalAssignedVoters; // Return the total count of assigned voters
        } else {
            return error("Failed to retrieve total assigned voters: " + totalAssignedVoters.message());
        }
    }

    // Get the voter matching with given election to auth processes.
    isolated function getVoter(string nic, string email = "") returns Voter|http:NotFound {
        if email.trim().length() == 0 {
            sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE NIC = ${nic}`;
            Voter|error voter = self.dbClient->queryRow(query);
            return voter is Voter ? voter : http:NOT_FOUND;
        }
        else {
            sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE NIC = ${nic} AND EMAIL = ${email}`;
            Voter|error voter = self.dbClient->queryRow(query);
            return voter is Voter ? voter : http:NOT_FOUND;
        }

    }

    // Add the candidate according to NewCandidate Record.
    isolated function addCandidate(NewCandidate newCandidate) returns CandidateAdded|http:BadRequest|error {
        sql:ParameterizedQuery query = `INSERT INTO CANDIDATES (NUMBER, NAME, ELECTION_ID) VALUES (${newCandidate.number}, ${newCandidate.name}, ${newCandidate.election_id})`;
        sql:ExecutionResult result = check self.dbClient->execute(query);

        string|int? id = result.lastInsertId;
        return id is int ? <CandidateAdded>{body: {...newCandidate, id: id}} : error("Error occurred while retriving the candidate id");
    }

    // Add the voter according to NewVoter Record.
    isolated function addVoter(NewVoter newVoter) returns VoterAdded|error {
        sql:ParameterizedQuery query = `INSERT INTO VOTERS (NAME, EMAIL, NIC, ELECTION_ID) VALUES ( ${newVoter.name}, ${newVoter.email}, ${newVoter.nic}, ${newVoter.election_id})`;
        sql:ExecutionResult result = check self.dbClient->execute(query);

        string|int? id = result.lastInsertId;
        return id is int ? <VoterAdded>{body: {...newVoter, id: id}} : error("Error occurred while retriving the voter id");
    }

    // vote for specific candidate.
    isolated function addVote(Vote newVote) returns typedesc<Voted>|http:NotFound & readonly|error {
        // Query to get the candidate by ID
        sql:ParameterizedQuery query1 = `SELECT * FROM CANDIDATES WHERE ID = ${newVote.candidateId}`;
        Candidate|error candidate = self.dbClient->queryRow(query1);

        // Query to get the voter by ID
        sql:ParameterizedQuery query2 = `SELECT * FROM VOTERS WHERE ID = ${newVote.voterId}`;
        Voter|error voter = self.dbClient->queryRow(query2);

        // Check if both candidate and voter exist
        if candidate is Candidate && voter is Voter {
            // Ensure the candidate and voter belong to the same election
            if candidate.election_id == voter.election_id {
                // Check if the voter has already voted
                if !voter.hasVote {
                    // Update the candidate's vote count
                    sql:ParameterizedQuery updateQuery1 = `UPDATE CANDIDATES SET VOTES = VOTES + 1 WHERE ID = ${newVote.candidateId}`;
                    _ = check self.dbClient->execute(updateQuery1);

                    // Update the voter's HASVOTE status to true
                    sql:ParameterizedQuery updateQuery2 = `UPDATE VOTERS SET HASVOTE = true WHERE ID = ${newVote.voterId}`;
                    _ = check self.dbClient->execute(updateQuery2);

                    // Return the success response
                    return Voted;
                } else {
                    return http:NOT_FOUND; //:NotFound("Voter has already voted.");
                }
            } else {
                return http:NOT_FOUND; //("Candidate and Voter do not belong to the same election.");
            }
        } else {
            return http:NOT_FOUND; //("Candidate or Voter not found.");
        }
    }

    // See the Result of the selected election.
    isolated function getResults(string election_id) returns Candidate[]|error {
        // Query to get candidates for a specific election ID, ordered by votes
        sql:ParameterizedQuery query = `SELECT * FROM CANDIDATES WHERE ELECTION_ID = ${election_id} ORDER BY VOTES DESC`;

        // Stream the candidates
        stream<Candidate, sql:Error?> candidateStream = self.dbClient->query(query);

        // Return the stream of candidates
        return from Candidate candidate in candidateStream
            select candidate;
    }

}
