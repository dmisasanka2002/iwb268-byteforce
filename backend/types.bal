// shemas and types 

import ballerina/http;
import ballerina/sql;
import ballerina/time;

# Description.
#
# + id - field description  
# + name - field description  
# + startDate - field description  
# + endDate - field description
public type Election record {|
    @sql:Column {
        name: "ID"
    }
    readonly int id;

    @sql:Column {
        name: "NAME"
    }
    string name;

    @sql:Column {
        name: "START_DATE"
    }
    time:Civil startDate;

    @sql:Column {
        name: "END_DATE"
    }
    time:Civil endDate;
|};

# Description.
#
# + id - field description  
# + election_id - field description  
# + name - field description  
# + number - field description  
# + votes - field description
public type Candidate record {|
    @sql:Column {
        name: "ID"
    }
    readonly int id;
    @sql:Column {
        name: "ELECTION_ID"
    }
    int election_id;
    @sql:Column {
        name: "NAME"
    }
    string name;
    @sql:Column {
        name: "NUMBER"
    }
    int number;
    @sql:Column {
        name: "VOTES"
    }
    int votes;
|};

# Description.
#
# + id - field description  
# + election_id - field description  
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
        name: "ELECTION_ID"
    }
    int election_id;
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
# + name - field description  
# + startDate - field description  
# + endDate - field description
public type NewElection record {|
    string name;
    time:Civil startDate;
    time:Civil endDate;

|};

# Description.
#
# + election_id - field description  
# + number - field description  
# + name - field description  
# + votes - field description
public type NewCandidate record {|
    int election_id;
    int number;
    string name;
    int votes = 0;
|};

# Description.
#
# + election_id - field description  
# + email - field description  
# + name - field description  
# + nic - field description  
# + hasVote - field description
public type NewVoter record {|
    int election_id;
    string email;
    string name;
    string nic;
    boolean hasVote = false;
|};

# Description.
#
# + email - field description  
# + password - field description 
public type NewAdmin record {|
    string email;
    string password;
|};

# Description.
#
# + candidateId - field description
# + voterNic - field description  
# + election_id - field description
public type Vote record {|
    int candidateId;
    string voterNic;
    int election_id;
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

# Description.
#
# + body - field description
public type ElectionAdded record {|
    *http:Created;
    Election body;
|};

# Description.
public type Voted record {|
    *http:Ok;
|};

# Description.
#
# + isSuccess - field description  
# + message - field description  
# + body - field description
public type Sucess record {
    boolean isSuccess = true;
    string message = "";
    json body = {};
};

# Description.
#
# + isSuccess - field description  
# + message - field description
public type Faild record {
    boolean isSuccess = false;
    string message = "";
};

public enum FileTypes {
    VOTERS,
    CANDIDATES,
    TEST
}
