import ballerina/http;
import ballerina/io;

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

    function init() returns error? {
        self.db = check new Database("Election");
    }

    resource function post election/create(NewElection newElection) returns ElectionAdded|http:BadRequest|error {
        ElectionAdded|http:BadRequest election;

        lock {
            io:println(newElection.clone());
            election = check self.db.createElection(newElection.clone()).clone();
        }
        return election;
    }

    resource function get candidates() returns Candidate[]|error {
        Candidate[] candidates;
        lock {
            candidates = check self.db.getCandidates().clone();
        }
        return candidates;
    }

    resource function get voter/[string nic]() returns Voter|http:NotFound {
        Voter|http:NotFound voter;
        lock {
            voter = self.db.getVoter(nic = nic).clone();
        }
        return voter is Voter ? voter : http:NOT_FOUND;

    }

    resource function get finalResult() {
    }

    resource function post vote(string voterId) {

    }

    resource function post addCandidate(NewCandidate newCandidate) returns CandidateAdded|http:BadRequest|error {
        CandidateAdded|http:BadRequest candidate;
        lock {
            io:println(newCandidate.clone());
            candidate = check self.db.addCandidate(newCandidate.clone()).clone();
        }
        return candidate;
    }

    resource function post addVoter(NewVoter newVoter) returns VoterAdded|http:BadRequest|error {
        VoterAdded|http:BadRequest voter;
        lock {
            voter = check self.db.addVoter(newVoter.clone()).clone();
        }
        return voter;
    }

    resource function post auth/voter() {

    }

}
