import ballerina/http;

# A service representing a network-accessible API
# bound to port `9090`.
service /api on new http:Listener(9090) {

    function init() returns error? {
        check initDatabase();
    }

    resource function get candidates() returns Candidate[]|error {
        Candidate[] candidates = check getCandidates();
        return candidates;
    }

    resource function get voter/[string nic]() returns Voter|http:NotFound {
        Voter|http:NotFound voter = getVoter(nic = nic);
        return voter is Voter ? voter : http:NOT_FOUND;

    }

    resource function get finalResult() {
    }

    resource function post vote(string voterId) {

    }

    resource function post addCandidate(NewCandidate newCandidate) returns CandidateAdded|http:BadRequest|error {
        CandidateAdded|http:BadRequest candidate = check addCandidate(newCandidate);
        return candidate;
    }

    resource function post addVoter(NewVoter newVoter) returns VoterAdded|http:BadRequest|error {
        VoterAdded|http:BadRequest voter = check addVoter(newVoter);
        return voter;
    }

    resource function post auth/voter() {

    }
}
