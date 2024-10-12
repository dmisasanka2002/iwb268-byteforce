import ballerina/sql;
import ballerina/time;

# Description.
#
# + startTime - field description  
# + endTime - field description
public type Times record {|
    string startTime;
    string endTime;
|};

# Description.
#
# + id - field description  
# + name - field description  
# + startDate - field description  
# + endDate - field description
public type ElectionData record {
    @sql:Column {
        name: "ID"
    }
    readonly int id;

    @sql:Column {
        name: "NAME"
    }
    string name;
    string startDate;
    string endDate;
};

# Converts time:Civil time to string 2022-07-12T05:42:35Z
#
# + time - time:Civil time record.
# + return - Converted ISO String string.
public isolated function civilToIsoString(time:Civil time) returns string|error {
    string year = time.year.toString();
    string month = time.month < 10 ? string `0${time.month}` : time.month.toString();
    string day = time.day < 10 ? string `0${time.day}` : time.day.toString();
    string hour = time.hour < 10 ? string `0${time.hour}` : time.hour.toString();
    string minute = time.minute < 10 ? string `0${time.minute}` : time.minute.toString();

    decimal? seconds = time.second;
    string second = seconds is () ? "00" : (seconds < 10.0d ? string `0${seconds}` : seconds.toString());

    time:ZoneOffset? zoneOffset = time.utcOffset;
    string timeZone = "Z";
    if zoneOffset is time:ZoneOffset {
        if zoneOffset.hours == 0 && zoneOffset.minutes == 0 {
            timeZone = "Z";
        } else {
            string hours = zoneOffset.hours.abs() < 10 ? string `0${zoneOffset.hours.abs()}` : zoneOffset.hours.abs().toString();
            string minutes = zoneOffset.minutes.abs() < 10 ? string `0${zoneOffset.minutes.abs()}` : zoneOffset.minutes.abs().toString();
            timeZone = zoneOffset.hours < 0 ? string `-${hours}${minutes}` : string `+${hours}${minutes}`;
        }
    }
    return string `${year}-${month}-${day}T${hour}:${minute}:${second}${timeZone}`;
}

# Description.
#
# + times - parameter description
# + return - return value description
public isolated function convertTimes(time:Civil[] times) returns Times|error {
    Times isoStrings = {startTime: "", endTime: ""};
    isoStrings.startTime = check civilToIsoString(times[0]);
    isoStrings.endTime = check civilToIsoString(times[1]);

    return isoStrings;
}
