import ballerina/jwt;

# Description.
#
# + jwtToken - the token that sent by frontend
# + return - decode data of the token
public isolated function decodeJwt(string jwtToken) returns error|[jwt:Header, jwt:Payload] {
    [jwt:Header, jwt:Payload] decode = check jwt:decode(jwtToken);
    return decode;
}

# Description.
public isolated function generateToken() {

}
