import ballerina/io;
import ballerina/test;

// ---------------------------------------------------- Before Suite Function -------------------------------------------------
@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("I'm the before suite function!");
}

// ------------------------------------------------------- Test functions -----------------------------------------------------
@test:Config {}
function testTimeConvert() {

}

// --------------------------------------------------  Negative test functions ------------------------------------------------
@test:Config {}
function testTimeConvertInvalid() {

}

// ----------------------------------------------------- After Suite Function -------------------------------------------------
@test:AfterSuite
function afterSuiteFunc() {
    io:println("I'm the after suite function!");
}
