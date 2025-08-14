import ballerina/http;

service / on new http:Listener(8083) {
    resource function get health() returns json {
        return { status: "ok" };
    }
}
