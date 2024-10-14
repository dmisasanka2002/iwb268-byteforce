import ballerina/jwt;

# Description.
#
# + jwtToken - parameter description
# + return - return value description
public isolated function decodeJwt(string jwtToken) returns error|[jwt:Header, jwt:Payload] {
    [jwt:Header, jwt:Payload] decode = check jwt:decode(jwtToken);
    return decode;
}

# Description.
public isolated function generateToken() {

}
