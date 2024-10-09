import backend.autherization;
import backend.readCSVFromRequest;
import backend.recordFromCSV;
import backend.timeConvert;
import backend.validations;

import ballerina/http;
import ballerina/io;
import ballerina/jwt;
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

    // success
    resource function post election/create(@http:Payload json data) returns ElectionAdded|http:BadRequest|error {
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

    resource function get election/eligible/list/[string voterNIC]() returns timeConvert:ElectionData[]|error {
        lock {
            timeConvert:ElectionData[] electionData = [];
            Election[] elections = check self.db.getElegibleList(voterNIC).clone();
            foreach var election in elections.clone() {
                timeConvert:Times times = check timeConvert:convertTimes([election.clone().startDate, election.clone().endDate]);

                electionData.push({name: election.clone().name, id: election.clone().id, startDate: times.startTime, endDate: times.endTime});

            }
            return electionData.clone();
        }
    }

    // TODO: implement this method to get election details such as percentage of vote, and analytics.
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
    resource function get voter/verify/nic/[string nic]() returns error|Voter|http:NotFound {
        Voter|http:NotFound voter;

        boolean|error verifyNIC = validations:verifyNIC(nic);

        if verifyNIC is boolean {
            lock {
                voter = self.db.getVoter(nic = nic).clone();
            }
            return voter is Voter ? voter : http:NOT_FOUND;
        }
        return verifyNIC;

    }

    // success
    resource function post voter/verify/credential(http:Request request) returns error|Voter|http:NotFound {
        json jsonPayload = check request.getJsonPayload();
        [jwt:Header, jwt:Payload] decodeJwt = check autherization:decodeJwt(check jsonPayload.credential);

        jwt:Payload payload = decodeJwt[1];
        string email = <string>payload["email"];
        string nic = check jsonPayload.nic;

        io:println(email);
        io:println(nic);

        Voter|http:NotFound voter;
        lock {
            voter = self.db.getVoter(nic = nic, email = email).clone();
        }
        return voter is Voter ? voter : http:NOT_FOUND;
    }

    // success
    resource function get finalResult/[string election_id]() returns error|Candidate[] {
        Candidate[] results;
        lock {
            results = check self.db.getResults(election_id).clone();
        }
        return results;
    }

    // success
    resource function put vote(Vote newVote) returns http:NotFound & readonly|http:Ok & readonly|error {
        lock {
            typedesc<Voted>|(http:NotFound & readonly) results = check self.db.addVote(newVote.clone());

            if results is http:NotFound {
                return http:NOT_FOUND;
            }
            return http:OK;
        }
    }

    // success
    resource function post addCandidate(NewCandidate newCandidate) returns CandidateAdded|http:BadRequest|error {
        CandidateAdded|http:BadRequest candidate;
        lock {
            candidate = check self.db.addCandidate(newCandidate.clone()).clone();
        }
        return candidate;
    }

    // success
    resource function post addVoter(NewVoter newVoter) returns VoterAdded|http:BadRequest|error {
        boolean|error verifyNIC = validations:verifyNIC(newVoter.nic);
        boolean|error verifyEmail = validations:VerifyEmail(newVoter.email);

        if verifyNIC is boolean && verifyEmail is boolean {
            lock {
                VoterAdded|error voter = self.db.addVoter(newVoter.clone()).clone();

                return voter.clone();
            }
        }
        else if verifyNIC is error {
            return error("Check the NIC again.");
        }
        else if verifyEmail is error {
            return error("Check the email again.");
        }
        return http:BAD_REQUEST;
    }

    // success
    resource function post upload/file/[FileTypes fileType]/[string election_id](http:Request request) returns http:Response|error {
        http:Response response = new;
        string[][] csvLines = check readCSVFromRequest:extractCSVLines(request);

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
        response.setPayload(csvLines);

        return response;
    }
}

