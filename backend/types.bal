// shemas and types 

import ballerina/http;
import ballerina/sql;

# Description.
#
# + id - field description  
# + name - field description  
# + votes - field description
public type Candidate record {|
    @sql:Column {
        name: "ID"
    }
    readonly int id;
    @sql:Column {
        name: "NAME"
    }
    string name;
    @sql:Column {
        name: "VOTES"
    }
    int votes;
|};

# Description.
#
# + id - field description  
# + name - field description  
# + email - field description  
# + nic - field description  
# + hasVote - field description
public type Voter record {|
    @sql:Column {
        name: "ID"
    }
    readonly int id;
    @sql:Column {
        name: "NAME"
    }
    string name;
    @sql:Column {
        name: "EMAIL"
    }
    string email;
    @sql:Column {
        name: "NIC"
    }
    string nic;
    @sql:Column {
        name: "HASVOTE"
    }
    boolean hasVote;
|};

# Description.
#
# + id - field description  
# + name - field description  
# + votes - field description
public type NewCandidate record {|
    int id;
    string name;
    int votes;
|};

# Description.
#
# + id - field description  
# + email - field description  
# + name - field description  
# + nic - field description  
# + hasVote - field description
public type NewVoter record {|
    int id;
    string email;
    string name;
    string nic;
    boolean hasVote = false;
|};

# Description.
#
# + body - field description
public type CandidateAdded record {|
    *http:Created;
    Candidate body;
|};

# Description.
#
# + body - field description
public type VoterAdded record {|
    *http:Created;
    Voter body;
|};
