//Construct record values 
# Description.
#
# + inputCSVData - parameter description
# + return - return value description
public isolated function createEmployeeRecord(string[][] inputCSVData) returns Employee[]|error {
    Employee[] employees = [];
    foreach var line in inputCSVData {
        Employee employee = {
            name: line[0],
            age: check int:fromString(line[1].trim()),
            salary: check decimal:fromString(line[2].trim()),
            isMarried: check boolean:fromString(line[3].trim())
        };
        employees.push(employee);
    }
    return employees;
}

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
    foreach var line in inputCSVData {
        NewVoter voter = {
            election_id: check int:fromString(election_id),
            name: line[0],
            email: line[1],
            nic: line[2]
        };
        voters.push(voter);
    }
    return voters;
}
