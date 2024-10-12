//Construct record values 
import backend.validations;

# Description.
#
# + inputCSVData - parameter description  
# + election_id - parameter description
# + return - return value description
public isolated function createCandidateRecord(string[][] inputCSVData, string election_id) returns NewCandidate[]|error {
    NewCandidate[] candidates = [];
    foreach var line in inputCSVData {
        NewCandidate candidate = {
            election_id: check int:fromString(election_id),
            number: check int:fromString(line[0]),
            name: line[1]
        };
        candidates.push(candidate);
    }
    return candidates;
}

# Description.
#
# + inputCSVData - parameter description  
# + election_id - parameter description
# + return - return value description
public isolated function createVoterRecord(string[][] inputCSVData, string election_id) returns NewVoter[]|error {
    NewVoter[] voters = [];
    error[] errors = [];
    foreach var line in inputCSVData {
        boolean|error verifyEmail = validations:VerifyEmail(line[1].trim());
        boolean|error verifyNIC = validations:verifyNIC(line[2].trim());

        if verifyEmail is boolean && verifyNIC is boolean {

            NewVoter voter = {
                election_id: check int:fromString(election_id),
                name: line[0],
                email: line[1],
                nic: line[2]
            };
            voters.push(voter);
        }
        else {
            errors.push(error(string `Error occurred when saving ${line[0]}`));
        }

    }
    return voters;
}
