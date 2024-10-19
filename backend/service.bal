import backend.autherization;
import backend.readCSVFromRequest;
import backend.recordFromCSV;
import backend.timeConvert;
import backend.validations;

import ballerina/http;
import ballerina/jwt;
import ballerina/time;

configurable string frontUrl = ?;
configurable string adminUrl = ?;

# A service representing a network-accessible API
# bound to port `9090`.
#
@http:ServiceConfig {
    cors: {
        allowOrigins: [frontUrl, adminUrl]
    }
}

isolated service /api on new http:Listener(9090) {

    private Database db;

    // success
    function init() returns error? {
        self.db = check new Database("Election");
    }

    resource function post admin/register(@http:Payload json data) returns error|http:Response {
        http:Response responce = new;
        Sucess|Faild result;
        NewAdmin newAdmin = {password: check data.password, email: check data.email};

        lock {
            result = check self.db.createAdmin(newAdmin.clone()).clone();
        }

        responce.setJsonPayload(result.toJson());
        return responce;
    }

    resource function post admin/signin(@http:Payload json data) returns error|http:Response {
        http:Response responce = new;
        Sucess|Faild result;
        string password = check data.password;
        string email = check data.email;

        lock {
            result = self.db.loginAdmin(email, password).clone();
        }

        responce.setJsonPayload(result.toJson());
        return responce;
    }

    // success with new return types.
    resource function post election/create(@http:Payload json data) returns error|http:Response {
        http:Response responce = new;
        Sucess|Faild result;
        NewElection newElection = {
            name: check data.name,
            startDate: check time:civilFromString(check data.startTime),
            endDate: check time:civilFromString(check data.endTime)
        };

        lock {
            result = check self.db.createElection(newElection.clone()).clone();
        }
        responce.setJsonPayload(result.toJson());
        return responce;
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

    // success with new return types.
    resource function post voter/verify/nic/[string nic]() returns http:Response|error {
        http:Response responce = new;
        validations:Verify verifyNIC = <validations:Verify>validations:verifyNIC(nic);

        if verifyNIC.isSuccess {
            Voter|Faild result;
            lock {
                result = check self.db.getVoter(nic = nic).clone();
            }
            responce.statusCode = result is Voter ? 200 : 404;
            responce.setJsonPayload(result.toJson());
            return responce;
        }
        responce.statusCode = 500;
        responce.setJsonPayload(verifyNIC.toJson());
        return responce;

    }

    // success with new return types.
    @http:ResourceConfig {
        cors: {
            allowOrigins: ["*"],
            allowCredentials: true
        }
    }
    resource function post voter/verify/credential(http:Request request) returns error|http:Response {
        http:Response responce = new;
        json jsonPayload = check request.getJsonPayload();
        [jwt:Header, jwt:Payload] decodeJwt = check autherization:decodeJwt(check jsonPayload.credential);

        jwt:Payload payload = decodeJwt[1];
        string email = <string>payload["email"];
        string nic = check jsonPayload.nic;

        Voter|Faild result;
        lock {
            result = check self.db.getVoter(nic = nic, email = email).clone();
        }
        responce.statusCode = result is Voter ? 200 : 404;
        responce.setJsonPayload(result.toJson());
        return responce;
    }

    // success
    resource function get elections/[string election_id]/assigned_voters() returns error|int {
        lock {
            int totalAssignedVoters = check self.db.getTotalAssignedVoters(election_id);

            return totalAssignedVoters;
        }
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

    resource function post vote(Vote newVote) returns http:Ok & readonly|http:Response {
        http:Response responce = new;
        typedesc<Voted>|Faild result;

        lock {
            result = self.db.addVote(newVote.clone()).clone();
        }
        if result is Faild {
            responce.statusCode = 400;
            responce.setJsonPayload(result.toJson());
            return responce;
        }
        return http:OK;
    }

    // success with new return types.
    resource function post addCandidate(NewCandidate newCandidate) returns error|http:Response {
        http:Response responce = new;
        Sucess|Faild candidate;

        lock {
            candidate = check self.db.addCandidate(newCandidate.clone()).clone();
        }
        responce.setJsonPayload(candidate.toJson());

        return responce;
    }

    resource function put candidate/update/[string candidate_id](NewCandidate updateCandidate) returns error|http:Response {
        http:Response responce = new;
        Sucess|Faild candidate;

        lock {
            candidate = check self.db.updateCandidate(updateCandidate.clone(), candidate_id).clone();
        }
        responce.statusCode = candidate is Sucess ? 200 : 404;
        responce.setJsonPayload(candidate.toJson());

        return responce;
    }

    // success with new return types.
    resource function post addVoter(NewVoter newVoter) returns http:Response|error {
        http:Response responce = new;
        Faild faild = {isSuccess: false, message: ""};
        validations:Verify verifyNIC = <validations:Verify>validations:verifyNIC(newVoter.nic);
        validations:Verify verifyEmail = validations:VerifyEmail(newVoter.email);

        if verifyNIC.isSuccess && verifyEmail.isSuccess {
            Sucess|Faild voter;
            lock {
                voter = check self.db.addVoter(newVoter.clone()).clone();
            }
            if voter is Sucess {
                responce.statusCode = 200;
            }
            else {
                responce.statusCode = 500;
            }
            responce.setJsonPayload(voter.toJson());
            return responce;
        }
        else if !verifyNIC.isSuccess {
            responce.statusCode = 500;
            responce.setJsonPayload(verifyNIC);
            return responce;
        }
        else if !verifyEmail.isSuccess {
            responce.statusCode = 500;
            responce.setJsonPayload(verifyEmail);
            return responce;
        }
        responce.statusCode = 500;
        responce.setJsonPayload(faild.toJson());
        return responce;
    }

    // success
    resource function post upload/file/[FileTypes fileType]/[string election_id](http:Request request) returns http:Response|error {
        http:Response response = new;
        string[][] csvLines = check readCSVFromRequest:extractCSVLines(request);

        if fileType == CANDIDATES {
            NewCandidate[] newCandidates = check recordFromCSV:createCandidateRecord(csvLines, election_id);

            foreach var newCandidate in newCandidates {
                Sucess|Faild|error result;
                lock {
                    result = self.db.addCandidate(newCandidate.clone()).clone();
                    response.statusCode = result is Sucess ? 201 : 400;
                }
                response.setJsonPayload(result is error ? result.message() : result.toJson());
            }
        }

        else if fileType == VOTERS {
            NewVoter[] newVoters = check recordFromCSV:createVoterRecord(csvLines, election_id);

            foreach var newVoter in newVoters {
                Sucess|Faild|error result;
                lock {
                    result = self.db.addVoter(newVoter.clone()).clone();
                    response.statusCode = result is Sucess ? 201 : 400;
                }
                response.setJsonPayload(result is error ? result.message() : result.toJson());
            }
        }
        // response.setPayload(csvLines);

        return response;
    }
}
