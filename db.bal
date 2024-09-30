// basic database configarations and funtionalities

import ballerina/file;
import ballerina/http;
import ballerina/sql;
import ballerinax/h2.driver as _;
import ballerinax/java.jdbc;

string dbPath = check file:getAbsolutePath("databases");

string jdbcUrl;

sql:Client dbClient;

function createDB(string database) {
    jdbcUrl = string `jdbc:h2:${dbPath}/ELECTION`;
    dbClient = check new jdbc:Client(jdbcUrl);
}

function initDatabase() returns error? {
    _ = check dbClient->execute(`CREATE TABLE IF NOT EXISTS CANDIDATES (ID INT AUTO_INCREMENT PRIMARY KEY, VOTES INT, NAME VARCHAR(255))`);
    _ = check dbClient->execute(`CREATE TABLE IF NOT EXISTS VOTERS (ID INT AUTO_INCREMENT PRIMARY KEY, EMAIL VARCHAR(255), NIC VARCHAR(50),HASVOTE BOOL, NAME VARCHAR(255))`);

}

function getCandidates() returns Candidate[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM CANDIDATES`;
    stream<Candidate, sql:Error?> candidateStream = dbClient->query(query);
    return from Candidate candidate in candidateStream
        select candidate;
}

function getVoter(string nic) returns Voter|http:NotFound {
    sql:ParameterizedQuery query = `SELECT * FROM VOTERS WHERE NIC = ${nic}`;
    Voter|error voter = dbClient->queryRow(query);
    return voter is Voter ? voter : http:NOT_FOUND;
}

function addCandidate(NewCandidate newCandidate) returns CandidateAdded|http:BadRequest|error {
    sql:ParameterizedQuery query = `INSERT INTO CANDIDATES (ID, NAME, VOTES) VALUES (${newCandidate.id}, ${newCandidate.name}, ${newCandidate.votes})`;
    sql:ExecutionResult result = check dbClient->execute(query);

    string|int? id = result.lastInsertId;
    newCandidate.id = <int>id;
    return id is int ? <CandidateAdded>{body: {...newCandidate}} : error("Error occurred while retriving the candidate id");
}

function addVoter(NewVoter newVoter) returns VoterAdded|http:BadRequest|error {
    sql:ParameterizedQuery query = `INSERT INTO VOTERS (ID, NAME, EMAIL, NIC) VALUES (${newVoter.id}, ${newVoter.name}, ${newVoter.email}, ${newVoter.nic})`;
    sql:ExecutionResult result = check dbClient->execute(query);

    string|int? id = result.lastInsertId;
    newVoter.id = <int>id;
    return id is int ? <VoterAdded>{body: {...newVoter}} : error("Error occurred while retriving the voter id");
}
