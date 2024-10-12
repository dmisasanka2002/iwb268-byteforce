import ballerina/file;
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
    isolated function createElection(NewElection newElection) returns error|Faild {
        Sucess success = {isSuccess: true, message: "Succesfully Create a new Election", body: {id: ""}};
        Faild faild = {isSuccess: false, message: "Error occurred while retriving the candidate id"};
        // Prepare the SQL query to insert the new election
        sql:ParameterizedQuery query = `INSERT INTO ELECTIONS (NAME, START_DATE, END_DATE) 
                                    VALUES (${newElection.name}, ${newElection.startDate}, ${newElection.endDate})`;

        // Execute the query
        sql:ExecutionResult|sql:Error result = self.dbClient->execute(query);

        string|int? id = result is sql:ExecutionResult ? result.lastInsertId : result.message();
        faild.message = id is string ? id : "";
        success.body = id is int ? {id: id} : {};
        return id is int ? success : faild;

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
    isolated function getVoter(string nic, string email = "") returns Voter|error|Faild {
        Faild faild = {isSuccess: false, message: "Not Found"};
        if email.trim().length() == 0 {
            sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE NIC = ${nic}`;
            Voter|error voter = self.dbClient->queryRow(query);
            faild.message = voter is error ? voter.message() : "";
            return voter is Voter ? voter : faild;
        }
        else {
            sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE NIC = ${nic} AND EMAIL = ${email}`;
            Voter|error voter = self.dbClient->queryRow(query);
            faild.message = voter is error ? voter.message() : "";
            return voter is Voter ? voter : faild;
        }

    }

    // Add the candidate according to NewCandidate Record.
    isolated function addCandidate(NewCandidate newCandidate) returns Sucess|Faild|error {
        Sucess success = {isSuccess: true, message: "", body: ""};
        Faild faild = {isSuccess: false, message: "Error occurred while retriving the candidate id"};
        sql:ParameterizedQuery query = `INSERT INTO CANDIDATES (NUMBER, NAME, ELECTION_ID) VALUES (${newCandidate.number}, ${newCandidate.name}, ${newCandidate.election_id})`;
        sql:ExecutionResult|sql:Error result = self.dbClient->execute(query);

        string|int? id = result is sql:ExecutionResult ? result.lastInsertId : result.message();
        faild.message = id is string ? id : "";
        return id is int ? success : faild;
    }

    // Add the voter according to NewVoter Record.
    isolated function addVoter(NewVoter newVoter) returns Sucess|Faild|error {
        Sucess success = {isSuccess: true, message: "Succefully Added", body: ""};
        Faild faild = {isSuccess: false, message: "Error occurred while retriving the voter id. Already Registered"};

        sql:ParameterizedQuery query = `INSERT INTO VOTERS (NAME, EMAIL, NIC, ELECTION_ID) VALUES ( ${newVoter.name}, ${newVoter.email}, ${newVoter.nic}, ${newVoter.election_id})`;
        sql:ExecutionResult|sql:Error result = self.dbClient->execute(query);

        string|int? id = result is sql:ExecutionResult ? result.lastInsertId : result.message();
        faild.message = id is string ? id : "";
        return id is int ? success : faild;
    }

    // vote for specific candidate.
    isolated function addVote(Vote newVote) returns typedesc<Voted>|Faild {
        Faild faild = {isSuccess: false, message: ""};

        // Step 1: Validate if the voter is registered for the given election
        sql:ParameterizedQuery voterQuery = `SELECT * FROM VOTERS WHERE ELECTION_ID = ${newVote.election_id} AND NIC = ${newVote.voterNic}`;
        Voter|error voterRecord = self.dbClient->queryRow(voterQuery);

        if voterRecord is Voter {
            boolean hasVoted = <boolean>voterRecord.hasVote;

            // Step 2: Check if the voter has already voted in this election
            if hasVoted {
                faild.message = "This voter has already voted in this election.";
                return faild;
            }

            // Step 3: Validate if the candidate belongs to the specified election
            sql:ParameterizedQuery candidateQuery = `SELECT * FROM CANDIDATES WHERE ELECTION_ID = ${newVote.election_id} AND ID = ${newVote.candidateId}`;
            Candidate|error candidateRecord = self.dbClient->queryRow(candidateQuery);

            if candidateRecord is record {} {
                // Step 4: Update the candidate's vote count
                sql:ParameterizedQuery updateVoteCountQuery = `UPDATE CANDIDATES SET VOTES = VOTES + 1 WHERE ID = ${newVote.candidateId}`;
                sql:ExecutionResult|sql:Error execute = self.dbClient->execute(updateVoteCountQuery);

                faild.message = execute is sql:Error ? execute.toString() : "";

                // Step 5: Mark the voter as having voted
                sql:ParameterizedQuery updateVoterQuery = `UPDATE VOTERS SET HASVOTE = true WHERE NIC = ${newVote.voterNic} AND ELECTION_ID = ${newVote.election_id}`;
                sql:ExecutionResult|sql:Error executeResult = self.dbClient->execute(updateVoterQuery);

                faild.message = executeResult is sql:Error ? executeResult.toString() : "";

                // Return success response
                return executeResult is sql:ExecutionResult ? Voted : faild;
            } else {
                faild.message = candidateRecord.message();
                return faild;
            }
        } else {
            faild.message = voterRecord.message();
            return faild;
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
