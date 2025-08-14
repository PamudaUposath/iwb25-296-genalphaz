import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;

//import ballerina/log;
//import ballerina/time;
//import uuid; // pseudo import; use appropriate uuid generator

final postgresql:Client dbClient = check new (
    "postgres", // host
    "postgres", // username
    "postgres", // password
    "lankadonate", // database
    5432 // port
);

public type Donor record {
    string nic;
    string first_name;
    string last_name;
    string email;
    string? date_of_birth;
    int? weight;
    string? district;
    string blood_type;
    string? last_donation_date = ();  // default NULL
    int points = 0;                   // default 0
    int total_donations = 0;          // default 0
    boolean banned = false;           // default false
};



listener http:Listener listener8082 = new (8082);

service /donors on listener8082 {

    // Insert donor (POST /donors)
  resource function post .(Donor req) returns json|error {

   sql:ParameterizedQuery pq = `INSERT INTO donors
    (nic, first_name, last_name, email, date_of_birth, weight, district, blood_type,
     last_donation_date, points, total_donations, banned)
    VALUES (${req.nic}, ${req.first_name}, ${req.last_name}, ${req.email},
            ${req.date_of_birth}::DATE, ${req.weight}, ${req.district}, ${req.blood_type},
            ${req.last_donation_date}, ${req.points}, ${req.total_donations}, ${req.banned})
    RETURNING id`;



    record {|int id;|} row = check dbClient->queryRow(pq);
    return {status: "success", id: row.id};
}



    // Get donor by ID (GET /donors/{id})
    resource function get [int id]() returns json|error {
        sql:ParameterizedQuery pq = `SELECT id, nic, first_name, last_name, email, date_of_birth, weight, district, blood_type, last_donation_date, points, total_donations, banned, created_at
                                     FROM donors WHERE id = ${id}`;
        record {|
            int id;
            string nic;
            string first_name;
            string last_name;
            string email;
            string? date_of_birth;
            int? weight;
            string? district;
            string blood_type;
            string? last_donation_date;
            int points;
            int total_donations;
            boolean banned;
            string created_at;
        |}? row = check dbClient->queryRow(pq);

        if row is () {
            return {status: "error", message: "Donor not found"};
        }
        return row;
    }

    // Update donor (PUT /donors/{id})
resource function put [int id](Donor req) returns json|error {
    sql:ParameterizedQuery pq = `UPDATE donors
                                 SET nic = ${req.nic},
                                     first_name = ${req.first_name},
                                     last_name = ${req.last_name},
                                     email = ${req.email},
                                     date_of_birth = ${req.date_of_birth},
                                     weight = ${req.weight},
                                     district = ${req.district},
                                     blood_type = ${req.blood_type},
                                     last_donation_date = ${req.last_donation_date},
                                     points = ${req.points},
                                     total_donations = ${req.total_donations},
                                     banned = ${req.banned},
                                     updated_at = now()
                                 WHERE id = ${id}`;

    sql:ExecutionResult res = check dbClient->execute(pq);

    if res.affectedRowCount == 0 {
        return {status: "error", message: "Donor not found"};
    }
    return {status: "success", id: id};
}



    // Delete donor (DELETE /donors/{id})
    resource function delete [int id]() returns json|error {
        sql:ParameterizedQuery pq = `DELETE FROM donors WHERE id = ${id}`;
        sql:ExecutionResult res = check dbClient->execute(pq);

        if res.affectedRowCount == 0 {
            return {status: "error", message: "Donor not found"};
        }
        return {status: "success", message: "Donor deleted"};
    }


resource function get eligibility/[int id]() returns json|error {
    // Get donor's last donation date
   // sql:ParameterizedQuery pq = `SELECT last_donation_date FROM donors WHERE id = ${id}`;
    //record {|string? last_donation_date;|}? res = check dbClient->queryRow(pq);

   // if res is () {
     //   return { status: "error", message: "Donor not found" };
   // }

    //string? last = res.last_donation_date;

    // If never donated → eligible now
    //if last == null || last.trim() == "" {
      //  return { eligible_in_days: 0, message: "Never donated - eligible now" };
   // }

    // Convert "YYYY-MM-DD" → RFC3339 "YYYY-MM-DDT00:00:00Z"
   // string rfcDate = last + "T00:00:00Z";

    // Parse into UTC time
   // time:Utc lastUtc = check time:parseUtc(rfcDate);
   // time:Utc nowUtc = time:utcNow();

    // Calculate days since last donation
   // int daysSince = <int>((nowUtc - lastUtc) / (1000 * 60 * 60 * 24));

   // int eligibleIn = daysSince >= 120 ? 0 : (120 - daysSince);

    // Next allowed date
   // time:Utc nextAllowedUtc = time:addDuration(lastUtc, {days: 120});
   // string nextAllowedStr = check time:format(nextAllowedUtc, "yyyy-MM-dd");

   // return {
     //   eligible_in_days: eligibleIn,
      //  next_allowed: nextAllowedStr,
       // message: eligibleIn == 0 ? "Eligible now" : "Not eligible yet"
    //};

//}

}

}