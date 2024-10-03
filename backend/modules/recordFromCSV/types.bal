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

public type Employee record {|
    string name;
    int age;
    decimal salary;
    boolean isMarried;
|};
