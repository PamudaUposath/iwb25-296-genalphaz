import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;

public type Center record {
    string name;
    string district;
    string? address;
    string? contact_phone;
    string? contact_email;
};

public type BloodRequirement record {
    int center_id;
    string blood_type;
    int units_required;
    int units_remaining;
    string? category;
    string? notes;
    string? end_time; // optional ISO string
};

final postgresql:Client dbClient = check new (
    "postgres", // host
    "postgres", // username
    "postgres", // password
    "lankadonate", // database
    5432 // port
);

listener http:Listener listener8081 = new (8081);

//just to try connection (http://localhost:8081/health)
service / on listener8081 {
    resource function get health() returns json {
        return {status: "ok"};
    }
}

service /centers on listener8081 {

    // Insert center  (http://localhost:8081/centers)
    resource function post .(Center center) returns json|error {
        sql:ParameterizedQuery pq = `INSERT INTO centers 
        (name, district, address, contact_phone, contact_email)
        VALUES (${center.name}, ${center.district}, ${center.address}, ${center.contact_phone}, ${center.contact_email})
        RETURNING id`;

        // Directly get the row with the 'id'
        record {|int id;|} row = check dbClient->queryRow(pq);

        return {status: "success", id: row.id};
    }

    // Get all centers (GET /centers) (http://localhost:8081/centers)
    isolated resource function get .() returns json|error {
        sql:ParameterizedQuery pq = `SELECT id, name, district, address, contact_phone, contact_email, created_at
                                 FROM centers ORDER BY id`;

        stream<record {|
            int id;
            string name;
            string district;
            string? address;
            string? contact_phone;
            string? contact_email;
            string created_at;
        |}, error?> resultStream = dbClient->query(pq);

        json[] centers = check from record {|
                int id;
                string name;
                string district;
                string? address;
                string? contact_phone;
                string? contact_email;
                string created_at;
            |} row in resultStream
            select row;

        return centers;
    }

    // Get center by ID (GET /centers/{id}) (http://localhost:8081/centers/2)
    resource function get [int id]() returns json|error {
        sql:ParameterizedQuery pq = `SELECT id, name, district, address, contact_phone, contact_email, created_at
                                     FROM centers WHERE id = ${id}`;
        record {|int id; string name; string district; string? address; string? contact_phone; string? contact_email; string created_at;|}? row = check dbClient->queryRow(pq);

        if row is () {
            return {status: "error", message: "Center not found"};
        }
        return row;
    }

    // Update center (PUT /centers/{id})  (http://localhost:8081/centers/2)
    resource function put [int id](Center center) returns json|error {
        sql:ParameterizedQuery pq = `UPDATE centers
                                     SET name = ${center.name},
                                         district = ${center.district},
                                         address = ${center.address},
                                         contact_phone = ${center.contact_phone},
                                         contact_email = ${center.contact_email}
                                     WHERE id = ${id}`;
        sql:ExecutionResult res = check dbClient->execute(pq);

        if res.affectedRowCount == 0 {
            return {status: "error", message: "Center not found"};
        }
        return {status: "success", id: id};
    }

    // Delete center (DELETE /centers/{id}) (http://localhost:8081/centers/2)
    resource function delete [int id]() returns json|error {
        sql:ParameterizedQuery pq = `DELETE FROM centers WHERE id = ${id}`;
        sql:ExecutionResult res = check dbClient->execute(pq);

        if res.affectedRowCount == 0 {
            return {status: "error", message: "Center not found"};
        }
        return {status: "success", message: "Center deleted"};
    }

}

service /blood_requirements on listener8081 {

    // Create a new requirement (POST)
    resource function post .(BloodRequirement req) returns json|error {

        // Prepare end_time if provided
        sql:ParameterizedQuery pq;

        if req.end_time is string {
            pq = `INSERT INTO blood_requirements
                (center_id, blood_type, units_required, units_remaining, category, notes, start_time, end_time)
                VALUES (${req.center_id}, ${req.blood_type}, ${req.units_required}, ${req.units_remaining},
                        ${req.category}, ${req.notes}, now(), TO_TIMESTAMP(${req.end_time}, 'YYYY-MM-DD HH24:MI:SS'))
                RETURNING id`;
        } else {
            pq = `INSERT INTO blood_requirements
                (center_id, blood_type, units_required, units_remaining, category, notes, start_time, end_time)
                VALUES (${req.center_id}, ${req.blood_type}, ${req.units_required}, ${req.units_remaining},
                        ${req.category}, ${req.notes}, now(), NULL)
                RETURNING id`;
        }

        // Execute query
        record {|int id;|} row = check dbClient->queryRow(pq);

        return {status: "success", id: row.id};
    }

    // Get all requirements (GET)
    resource function get .() returns json|error {
        sql:ParameterizedQuery pq = `SELECT id, center_id, blood_type, units_required, units_remaining,
                                            category, notes, start_time, end_time, created_at, updated_at
                                     FROM blood_requirements ORDER BY id`;

        stream<record {|
            int id;
            int center_id;
            string blood_type;
            int units_required;
            int units_remaining;
            string? category;
            string? notes;
            string? start_time;
            string? end_time;
            string created_at;
            string updated_at;
        |}, error?> resultStream = dbClient->query(pq);

        json[] requirements = check from var row in resultStream
            select row;
        return requirements;
    }

    // Get requirement by ID (GET /blood-requirements/{id})
    resource function get [int id]() returns json|error {
        sql:ParameterizedQuery pq = `SELECT id, center_id, blood_type, units_required, units_remaining,
                                            category, notes, start_time, end_time, created_at, updated_at
                                     FROM blood_requirements
                                     WHERE id = ${id}`;

        record {|
            int id;
            int center_id;
            string blood_type;
            int units_required;
            int units_remaining;
            string? category;
            string? notes;
            string? start_time;
            string? end_time;
            string created_at;
            string updated_at;
        |}? row = check dbClient->queryRow(pq);

        if row is () {
            return {status: "error", message: "Requirement not found"};
        }
        return row;
    }

    // Update requirement (PUT /blood-requirements/{id})
    resource function put [int id](BloodRequirement req) returns json|error {
        sql:ParameterizedQuery pq = `UPDATE blood_requirements
                                     SET center_id = ${req.center_id},
                                         blood_type = ${req.blood_type},
                                         units_required = ${req.units_required},
                                         units_remaining = ${req.units_remaining},
                                         category = ${req.category},
                                         notes = ${req.notes},
                                         
                                         end_time = ${req.end_time},
                                         updated_at = now()
                                     WHERE id = ${id}`;

        sql:ExecutionResult res = check dbClient->execute(pq);
        if res.affectedRowCount == 0 {
            return {status: "error", message: "Requirement not found"};
        }
        return {status: "success", id: id};
    }

    // Delete requirement (DELETE /blood-requirements/{id})
    resource function delete [int id]() returns json|error {
        sql:ParameterizedQuery pq = `DELETE FROM blood_requirements WHERE id = ${id}`;
        sql:ExecutionResult res = check dbClient->execute(pq);
        if res.affectedRowCount == 0 {
            return {status: "error", message: "Requirement not found"};
        }
        return {status: "success", message: "Requirement deleted"};
    }
}


