// autherizations and email verifications
import ballerina/jwt;

function verifyNIC(string nic) returns boolean {
    return true;
}

function VerifyEmail(string email) {

}

function authMiddleware() returns boolean {
    jwt:ValidatorConfig validatorConfig;
    jwt:IssuerConfig issuerConfig;

    return true;
}
