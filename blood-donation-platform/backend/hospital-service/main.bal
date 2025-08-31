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

public type Donation record {
    int donor_id;
    int center_id;
    int requirement_id;
    string? verified_by;
    float? hemoglobin_level;
};

final postgresql:Client dbClient = check new (
    "postgres", // host
    "postgres", // username
    "postgres", // password
    "lankadonate", // database
    5432 // port
);

// Helper function to join strings manually
function joinStrings(string[] arr, string sep) returns string {
    string result = "";
    int len = arr.length();
    if len == 0 {
        return result;
    }
    result += arr[0];
    foreach int i in 1 ..< len {
        result += sep + arr[i];
    }
    return result;
}

listener http:Listener listener8081 = new (8081);

// Apply CORS directly on the service
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        allowCredentials: true
    }
}



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

    // Filter blood requirements (GET /blood_requirements/filter?blood_type=A+&district=Colombo&category=urgent)


}

service /donations on listener8081 {

    // Insert a new donation (POST /donations)
   

    // Insert a new donation (POST /donations)
resource function post .(Donation req) returns json|error {

    // Insert donation, points_awarded = 500
    sql:ParameterizedQuery pq = `INSERT INTO donations
        (donor_id, center_id, requirement_id, donated_at, verified_by, hemoglobin_level, points_awarded)
        VALUES (${req.donor_id}, ${req.center_id}, ${req.requirement_id}, now(),
                ${req.verified_by}, ${req.hemoglobin_level}, 500)
        RETURNING id`;

    record {|int id;|} row = check dbClient->queryRow(pq);

    // After donation, decrease units_remaining by 1
    sql:ParameterizedQuery updateUnits = `UPDATE blood_requirements
                                          SET units_remaining = units_remaining + 1
                                          WHERE id = ${req.requirement_id}
                                          AND units_remaining > 0`;
    sql:ExecutionResult res = check dbClient->execute(updateUnits);

    sql:ParameterizedQuery updateRequiredUnits = `UPDATE blood_requirements
                                          SET units_required = units_required - 1
                                          WHERE id = ${req.requirement_id}
                                          AND units_required > 0`;
    sql:ExecutionResult res1 = check dbClient->execute(updateRequiredUnits);

    return {
        status: "success",
        id: row.id,
        points_awarded: 500,
        updated_units_remaining: res.affectedRowCount > 0 ? "incresed by 1" : "already 0",
        required_units_remaining: res1.affectedRowCount > 0 ? "decreased by 1" : "already 0"
    };
}


     //Get all donations for a specific donor (GET /donations/{donorId})
    resource function get history/[int donorId]() returns json|error {

        sql:ParameterizedQuery pq = `SELECT id, donor_id, center_id, requirement_id,
                                            donated_at, verified_by, hemoglobin_level, points_awarded
                                     FROM donations
                                     WHERE donor_id = ${donorId}
                                     ORDER BY donated_at DESC`;

        stream<record {|
            int id;
            int donor_id;
            int center_id;
            int requirement_id;
            string donated_at;
            string? verified_by;
            decimal? hemoglobin_level;
            int points_awarded;
        |}, error?> resultStream = dbClient->query(pq);

        json[] donations = check from var row in resultStream
                           select row;

        return donations;
    }

     // Function 1: Get total donation count for a donor
    resource function get count/[int donorId]() returns json|error {
        sql:ParameterizedQuery pq = `SELECT COUNT(*) AS donation_count
                                     FROM donations
                                     WHERE donor_id = ${donorId}`;

        record {|int donation_count;|}? row = check dbClient->queryRow(pq);

        if row is () {
            return {status: "error", message: "Donor not found or no donations"};
        }

        return {
            donor_id: donorId,
            donation_count: row.donation_count
        };
    }

      // Function 2: Calculate total points for a donor
    resource function get Points/[int donorId]() returns json|error {
        // Reuse the count query
        sql:ParameterizedQuery pq = `SELECT COUNT(*) AS donation_count
                                     FROM donations
                                     WHERE donor_id = ${donorId}`;

        record {|int donation_count;|}? row = check dbClient->queryRow(pq);

        if row is () {
            return {status: "error", message: "Donor not found or no donations"};
        }

        int totalPoints = row.donation_count * 500;

        return {
            donor_id: donorId,
            donation_count: row.donation_count,
            total_points: totalPoints
        };
    }

}

