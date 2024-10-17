//Construct record values 
import backend.validations;

import ballerina/io;

# Description.
#
# + inputCSVData - array of lines of csv data  
# + election_id - election id
# + return - the record that create using csv data
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
# + inputCSVData - array of lines of csv data  
# + election_id - election id
# + return - the record that create using csv data
public isolated function createVoterRecord(string[][] inputCSVData, string election_id) returns NewVoter[]|error {
    NewVoter[] voters = [];
    foreach var line in inputCSVData {
        validations:Verify verifyEmail = validations:VerifyEmail(line[1].trim());
        validations:Verify verifyNIC = <validations:Verify>validations:verifyNIC(line[2].trim());

        if verifyEmail.isSuccess && verifyNIC.isSuccess {

            NewVoter voter = {
                election_id: check int:fromString(election_id),
                name: line[0],
                email: line[1],
                nic: line[2]
            };
            voters.push(voter);
        }
        else {
            io:println(`error in Line ${line}`);
        }

    }
    return voters;
}
