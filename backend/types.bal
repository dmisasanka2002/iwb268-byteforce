// shemas and types 

import ballerina/http;
import ballerina/sql;

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

public type NewCandidate record {|
    int id;
    string name;
    int votes;
|};

public type NewVoter record {|
    int id;
    string email;
    string name;
    string nic;
    boolean hasVote;
|};

public type CandidateAdded record {|
    *http:Created;
    Candidate body;
|};

public type VoterAdded record {|
    *http:Created;
    Voter body;
|};
