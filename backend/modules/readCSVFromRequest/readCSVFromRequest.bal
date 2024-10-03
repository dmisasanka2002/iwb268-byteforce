import ballerina/http;
import ballerina/io;
import ballerina/mime;

//Read the incoming data in bytes and extracts CSV data
# Description.
#
# + request - parameter description
# + return - return value description
public isolated function extractCSVLines(http:Request request) returns string[][]|error {
    var bodyParts = request.getBodyParts();
    if (bodyParts is mime:Entity[]) {
        string[][] csvLines = [];
        foreach var bodyPart in bodyParts {
            var mediaType = mime:getMediaType(bodyPart.getContentType());
            if (mediaType is mime:MediaType) {
                byte[] payload = check bodyPart.getByteArray();
                io:ReadableByteChannel readableByteChannel = check io:createReadableChannel(payload);
                io:ReadableCharacterChannel readableCharacterChannel = new (readableByteChannel, "UTF-8");
                io:ReadableCSVChannel readableCSVChannel = new io:ReadableCSVChannel(readableCharacterChannel, ",", 1);
                csvLines = check channelReadCsv(readableCSVChannel);
            } else {
                return error("Invalid media type!");
            }
        }
        return csvLines;
    } else {
        return error("Error in decoding multiparts!");
    }
}

//Read the io:ReadableCSVChannel and construct string[][] which represents CSV data 
isolated function channelReadCsv(io:ReadableCSVChannel readableCSVChannel) returns string[][]|error {
    string[][] results = [];
    int i = 0;
    while readableCSVChannel.hasNext() {
        var records = readableCSVChannel.getNext();
        if records is string[] {
            results[i] = records;
            i += 1;
        } else if records is error {
            check readableCSVChannel.close();
            return records;
        }
    }
    check readableCSVChannel.close();
    return results;
}

