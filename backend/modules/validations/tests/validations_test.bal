import ballerina/io;
import ballerina/test;

// ---------------------------------------------------- Before Suite Function -------------------------------------------------
@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("I'm the before suite function!");
}

// ------------------------------------------------------- Test functions -----------------------------------------------------
@test:Config {}
function testNICWithValidType1() returns error? {
    string nic = "200256789135";
    Verify result = <Verify>verifyNIC(nic);
    Verify expected = {isSuccess: true, message: "Added"};

    test:assertEquals(result, expected);
}

@test:Config {}
function testNICWithValidType2() returns error? {
    string nic = "984046835v";
    Verify result = <Verify>verifyNIC(nic);
    Verify expected = {isSuccess: true, message: "Added"};

    test:assertEquals(result, expected);
}

// --------------------------------------------------  Negative test functions ------------------------------------------------
@test:Config {}
function testNICWithInvalidType1() returns error? {
    string nic = "";
    Verify result = <Verify>verifyNIC(nic);
    Verify expected = {isSuccess: false, message: "NIC cannot be empty"};

    test:assertEquals(result, expected);
}

@test:Config {}
function testNICWithInvalidType2() returns error? {
    string nic = "1234567891235";
    Verify result = <Verify>verifyNIC(nic);
    Verify expected = {isSuccess: false, message: "NIC must be either 10 or 12 characters long"};

    test:assertEquals(result, expected);
}

@test:Config {}
function testNICWithInvalidType3() returns error? {
    string nic = "123456789j";
    Verify result = <Verify>verifyNIC(nic);
    Verify expected = {isSuccess: false, message: "NIC must contain only numeric characters, or end with 'v' for 10-character NICs"};

    test:assertEquals(result, expected);
}

@test:Config {}
function testNICWithInvalidType4() returns error? {
    string nic = "20024536987v";
    Verify result = <Verify>verifyNIC(nic);
    Verify expected = {isSuccess: false, message: "NIC must contain only digits for 12-character NICs"};

    test:assertEquals(result, expected);
}

// ----------------------------------------------------- After Suite Function -------------------------------------------------
@test:AfterSuite
function afterSuiteFunc() {
    io:println("I'm the after suite function!");
}
