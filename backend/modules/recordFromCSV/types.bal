# Description.
#
# + election_id - id of the election that the candidate include  
# + number - number of the candidate  
# + name - name of the candidate  
# + votes - vote count of candidate, default value = 0
public type NewCandidate record {|
    int election_id;
    int number;
    string name;
    int votes = 0;
|};

# Description.
#
# + election_id - id of the election  
# + email - gmail address of the voter  
# + name - name of the voter  
# + nic - nic number of the voter  
# + hasVote - parameter that include the voter is already vote or not
public type NewVoter record {|
    int election_id;
    string email;
    string name;
    string nic;
    boolean hasVote = false;
|};
