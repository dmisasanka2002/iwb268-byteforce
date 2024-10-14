import backend.timeConvert;

import ballerina/http;
import ballerina/io;
import ballerina/test;

http:Client testClient = check new ("http://localhost:9090/api");

// ---------------------------------------------------- Before Suite Function -------------------------------------------------
@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("I'm the before suite function!");
}

// ------------------------------------------------------- Test functions -----------------------------------------------------
@test:Config {}
function testServiceForCreateElection() returns error? {
    json data = {name: "Check Testing Functions", startTime: "2024-10-13T16:45:00Z", endTime: "2024-10-15T16:43:00Z"};
    http:Response responce = check testClient->post("/election/create", data);
    json|http:ClientError jsonPayload = responce.getJsonPayload();
    test:assertEquals(jsonPayload, {isSuccess: true, message: "Succesfully Create a new Election", body: {id: 1}});
}

@test:Config {}
function testServiceForGetElectionList() returns http:ClientError? {
    timeConvert:ElectionData[] response = check testClient->get("/election/list");
    timeConvert:ElectionData[] expected = [{"id": 1, "name": "Check Testing Functions", "startDate": "2024-10-13T16:45:00Z", "endDate": "2024-10-15T16:43:00Z"}];

    test:assertEquals(response[0], expected[0]);
}

@test:Config {}
function testServiceForAddCandidate() returns error? {
    json data = {election_id: 1, number: 10, name: "testing candidate1"};
    http:Response responce = check testClient->post("/addCandidate", data);
    json|http:ClientError jsonPayload = responce.getJsonPayload();
    test:assertEquals(jsonPayload, {isSuccess: true, message: "Succefully Added", body: ""});
}

@test:Config {}
function testServiceForAddVoter() returns error? {
    json data = {election_id: 1, email: "testing@email.com", name: "testing voter1", nic: "200045831762"};
    http:Response responce = check testClient->post("/addVoter", data);
    json|http:ClientError jsonPayload = responce.getJsonPayload();
    test:assertEquals(jsonPayload, {isSuccess: true, message: "Succefully Added", body: ""});
}

@test:Config {}
function testServiceForEditCandidate() returns error? {
    json data = {election_id: 1, number: 15, name: "testing candidate1 edited"};
    http:Response responce = check testClient->post("/candidates/update/1", data);
    json|http:ClientError jsonPayload = responce.getJsonPayload();
    test:assertEquals(jsonPayload, {isSuccess: true, message: "Update Succesfull.", body: ""});
}

@test:Config {}
function testServiceForGetCandidatesList() returns http:ClientError? {
    Candidate[] responce = check testClient->get("/candidates/list/1");
    Candidate[] expected = [{election_id: 1, number: 10, name: "testing candidate1", votes: 0, id: 0}];
    test:assertEquals(responce[0], expected[0]);
}

@test:Config {}
function testServiceForGetVotersList() returns error? {
    Voter[] responce = check testClient->get("/voters/list/1");
    Voter[] expected = [{election_id: 1, name: "testing voter1", nic: "200045831762", id: 1, email: "testing@email.com", hasVote: false}];
    test:assertEquals(responce[0], expected[0]);
}

// --------------------------------------------------  Negative test functions ------------------------------------------------

// After Suite Function
@test:AfterSuite
function afterSuiteFunc() {
    io:println("I'm the after suite function!");
}
