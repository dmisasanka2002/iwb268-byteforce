import ballerina/file;
import ballerina/http;
import ballerina/sql;
import ballerinax/h2.driver as _;
import ballerinax/java.jdbc;

public class Database {
    private string dbPath;
    private string jdbcUrl;
    private final sql:Client dbClient;

    isolated function init(string databaseName) returns error? {
        self.dbPath = check file:getAbsolutePath("databases");
        self.jdbcUrl = string `jdbc:h2:${self.dbPath}/${databaseName}`;
        self.dbClient = check new jdbc:Client(self.jdbcUrl);

        // Create the ELECTIONS table with DATETIME for start and end times
        _ = check self.dbClient->execute(`
        CREATE TABLE IF NOT EXISTS ELECTIONS (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        NAME VARCHAR(255) UNIQUE NOT NULL,
        START_DATE DATETIME NOT NULL,
        END_DATE DATETIME NOT NULL
        )`);

        // Create the CANDIDATES table with a foreign key to ELECTIONS
        _ = check self.dbClient->execute(`
        CREATE TABLE IF NOT EXISTS CANDIDATES (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        ELECTION_ID INT,
        NUMBER INT UNIQUE NOT NULL,
        NAME VARCHAR(255) NOT NULL,
        VOTES INT DEFAULT 0,
        FOREIGN KEY (ELECTION_ID) REFERENCES ELECTIONS(ID) ON DELETE CASCADE
        )`);

        // Create the VOTERS table with a foreign key to ELECTIONS
        _ = check self.dbClient->execute(`
        CREATE TABLE IF NOT EXISTS VOTERS (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        ELECTION_ID INT,
        NAME VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) UNIQUE NOT NULL,
        NIC VARCHAR(50) UNIQUE NOT NULL,
        HASVOTE BOOL DEFAULT FALSE,
        FOREIGN KEY (ELECTION_ID) REFERENCES ELECTIONS(ID) ON DELETE CASCADE
        )`);
    }

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

    isolated function getElections() returns Election[]|error {
        sql:ParameterizedQuery query = `SELECT * FROM ELECTIONS`;
        stream<Election, sql:Error?> electionStream = self.dbClient->query(query);
        return from Election election in electionStream
            select election;
    }

    isolated function getCandidates(string election_id) returns Candidate[]|error {
        sql:ParameterizedQuery query = `SELECT * FROM CANDIDATES WHERE ELECTION_ID = ${election_id}`;
        stream<Candidate, sql:Error?> candidateStream = self.dbClient->query(query);
        return from Candidate candidate in candidateStream
            select candidate;
    }

    isolated function getVoters(string election_id) returns Voter[]|error {
        sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE ELECTION_ID = ${election_id}`;
        stream<Voter, sql:Error?> voterStream = self.dbClient->query(query);
        return from Voter voter in voterStream
            select voter;
    }

    isolated function getVoter(string nic) returns Voter|http:NotFound {
        sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE NIC = ${nic}`;
        Voter|error voter = self.dbClient->queryRow(query);
        return voter is Voter ? voter : http:NOT_FOUND;
    }

    isolated function addCandidate(NewCandidate newCandidate) returns CandidateAdded|http:BadRequest|error {
        sql:ParameterizedQuery query = `INSERT INTO CANDIDATES (NUMBER, NAME, ELECTION_ID) VALUES (${newCandidate.number}, ${newCandidate.name}, ${newCandidate.election_id})`;
        sql:ExecutionResult result = check self.dbClient->execute(query);

        string|int? id = result.lastInsertId;
        return id is int ? <CandidateAdded>{body: {...newCandidate, id: id}} : error("Error occurred while retriving the candidate id");
    }

    isolated function addVoter(NewVoter newVoter) returns VoterAdded|http:BadRequest|error {
        sql:ParameterizedQuery query = `INSERT INTO VOTERS (NAME, EMAIL, NIC, ELECTION_ID) VALUES ( ${newVoter.name}, ${newVoter.email}, ${newVoter.nic}, ${newVoter.election_id})`;
        sql:ExecutionResult result = check self.dbClient->execute(query);

        string|int? id = result.lastInsertId;
        return id is int ? <VoterAdded>{body: {...newVoter, id: id}} : error("Error occurred while retriving the voter id");
    }

    isolated function addVote(Vote newVote) {

    }

    isolated function getResults(string election_id) {

    }

}
