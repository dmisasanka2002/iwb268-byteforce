import backend.readCSVFromRequest;
import backend.recordFromCSV;
import backend.timeConvert;

import ballerina/http;
import ballerina/io;
import ballerina/time;

# A service representing a network-accessible API
# bound to port `9090`.
#
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
isolated service /api on new http:Listener(9090) {

    private Database db;

    // success
    function init() returns error? {
        self.db = check new Database("Election");
    }

    // success - "startDate":{"timeAbbrev":"Z","dayOfWeek":2,"year":2024,"month":10,"day":1,"hour":9,"minute":16,"second":0},
    resource function post election/create(@http:Payload json data) returns ElectionAdded|http:BadRequest|error {
        // io:println(data.clone());
        ElectionAdded|http:BadRequest election;
        NewElection newElection = {
            name: check data.name,
            startDate: check time:civilFromString(check data.startTime),
            endDate: check time:civilFromString(check data.endTime)
        };

        lock {
            election = check self.db.createElection(newElection.clone()).clone();
        }
        return election;
    }

    // success
    resource function get election/list() returns string|timeConvert:ElectionData[]|error {
        lock {
            timeConvert:ElectionData[] electionData = [];
            Election[] elections = check self.db.getElections().clone();
            foreach var election in elections.clone() {
                timeConvert:Times times = check timeConvert:convertTimes([election.clone().startDate, election.clone().endDate]);

                electionData.push({name: election.clone().name, id: election.clone().id, startDate: times.startTime, endDate: times.endTime});

            }
            return electionData.clone();
        }

    }

    resource function get election/details/[string election_id]() {

    }

    // success
    resource function get candidates/list/[string election_id]() returns Candidate[]|error {
        Candidate[] candidates;
        lock {
            candidates = check self.db.getCandidates(election_id).clone();
        }
        return candidates;
    }

    // success
    resource function get voters/list/[string election_id]() returns Voter[]|error {
        Voter[] voters;
        lock {
            voters = check self.db.getVoters(election_id).clone();
        }
        return voters;
    }

    // success
    resource function get voter/[string nic]() returns Voter|http:NotFound {
        Voter|http:NotFound voter;
        lock {
            voter = self.db.getVoter(nic = nic).clone();
        }
        return voter is Voter ? voter : http:NOT_FOUND;

    }

    resource function get finalResult/[string election_id]() returns error|Candidate[] {
        Candidate[] results;
        lock {
            results = check self.db.getResults(election_id).clone();
        }
        return results;
    }

    resource function put vote(Vote newVote) returns error? {
        // io:println(newVote);
        lock {
            typedesc<Voted>|(http:NotFound & readonly) results = check self.db.addVote(newVote.clone());
            io:println(results);
        }
    }

    // success
    resource function post addCandidate(NewCandidate newCandidate) returns CandidateAdded|http:BadRequest|error {
        CandidateAdded|http:BadRequest candidate;
        lock {
            io:println(newCandidate.clone());
            candidate = check self.db.addCandidate(newCandidate.clone()).clone();
        }
        return candidate;
    }

    // success
    resource function post addVoter(NewVoter newVoter) returns VoterAdded|http:BadRequest|error {
        VoterAdded|http:BadRequest voter;
        lock {
            voter = check self.db.addVoter(newVoter.clone()).clone();
        }
        return voter;
    }

    resource function post auth/voter() {

    }

    resource function post upload/file/[FileTypes fileType]/[string election_id](http:Request request) returns http:Response|error {
        http:Response response = new;
        string[][] csvLines = check readCSVFromRequest:extractCSVLines(request);
        // io:println(csvLines); // success

        if fileType == CANDIDATES {
            NewCandidate[] newCandidates = check recordFromCSV:createCandidateRecord(csvLines, election_id);

            foreach var newCandidate in newCandidates {
                lock {
                    CandidateAdded|http:BadRequest _ = check self.db.addCandidate(newCandidate.clone()).clone();
                }
            }
        }

        else if fileType == VOTERS {
            NewVoter[] newVoters = check recordFromCSV:createVoterRecord(csvLines, election_id);

            foreach var newVoter in newVoters {
                lock {
                    VoterAdded|http:BadRequest _ = check self.db.addVoter(newVoter.clone()).clone();
                }
            }
        }

        // Employee[] employees = check recordFromCSV:createEmployeeRecord(csvLines);
        //Returns extracted data in the response. Or can do whatever processing as needed. 
        response.setPayload(csvLines);

        return response;
    }
}

