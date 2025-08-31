import ballerina/http;

service / on new http:Listener(8082) {
    resource function get health() returns json {
        return { status: "ok" };
    }
}
