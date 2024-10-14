public type Verify record {|
    boolean isSuccess;
    string message;
|};

// Function to verify the NIC
public isolated function verifyNIC(string nic) returns boolean|Verify {
    Verify result = {isSuccess: false, message: ""};
    // Check if the NIC is empty
    if nic.trim().length() == 0 {
        result.message = "NIC cannot be empty";
        return result;
    }

    // Get the length of the NIC
    int length = nic.length();

    // Validate length: must be 12 characters for numeric NICs or 10 characters with an optional 'v'
    if length != 12 && length != 10 {
        result.message = "NIC must be either 10 or 12 characters long";
        return result;
    }

    // If the NIC is 12 characters long, check that it contains only digits
    if length == 12 && !nic.matches(re `^[0-9]*$`) {
        result.message = "NIC must contain only digits for 12-character NICs";
        return result;
    }

    // Check if the NIC contains only alphanumeric characters
    if !nic.matches(re `^[0-9]*$`) && !(length == 10 && nic.endsWith("v")) {
        result.message = "NIC must contain only numeric characters, or end with 'v' for 10-character NICs";
        return result;
    }

    // If all checks passed, the NIC is valid
    result.isSuccess = true;
    result.message = "Added";
    return result;
}

// Function to verify the email
public isolated function VerifyEmail(string email) returns Verify {
    Verify result = {isSuccess: false, message: ""};
    // Check if the email is empty
    if email.trim().length() == 0 {
        result.message = "Email cannot be empty";
        return result;
    }

    // Validate email format using a regular expression
    if !email.matches(re `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`) {
        result.message = "Invalid email format";
        return result;
    }

    // If all checks passed, the email is valid
    result.isSuccess = true;
    return result;
}
