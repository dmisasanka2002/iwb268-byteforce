import ballerina/http;

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for generating greetings
    # + name - name as a string or nil
    # + return - string name with hello message or error
    resource function get greeting(string? name) returns string|error {
        // Send a response back to the caller.
        if name is () {
            return error("name should not be empty!");
        }
        return string `Hello, ${name}`;
    }

    resource function get result() {
    }

    resource function put vote(string id, string voterId) {

    }

    resource function post addCandidate(@http:Payload json payload) {

    }

    resource function post addVoter(@http:Payload json payload) {

    }

    resource function put auth/voter() {

    }
}
