
# Backend Setup Guide


## 1. Build the Container

Navigate to the **backend** folder from the location where your GitHub repository is initialized, and build the container:

docker compose up --build -d

This will create 6 images inside the "backend" container .  make sure all the images are running. 


## 2. Create the Database

Use the provided SQL file to create the database:

psql -U <username> -d <database_name> -f path/to/database.sql
docker exec -it backend-postgres-1 psql -U postgres -d lankadonate

> Replace `<username>` and `<database_name>` with your actual PostgreSQL username and database name.
type database\migrations\001_init.sql | docker exec -i backend-postgres-1 psql -U postgres -d lankadonate

Check whether the database is created successfully by running:
docker exec -it backend-postgres-1 psql -U postgres -d lankadonate
\dt
\dn
\q

## 3. Test the APIs

Once the container and database are ready, run the backend and test the APIs.

To ensure everything works fine, visit:

http://localhost:8081/health

You should see a JSON reply:

```json
{
  "status": "ok"
}
```


# Blood Donation System API

This project provides APIs for managing donors, blood requirements, donations, and donation centers. It is designed to track donor contributions, manage blood inventory, and display leaderboards.

---

## Features

### 1. Donor Management
- **Register Donor** – ✅ Completed  
- **Update Donor** – ✅ Completed  
- **Delete Donor** – ✅ Completed  
- **Get Donor Details by ID** – ✅ Completed  
  - Used for displaying donor information  
  - Checks eligibility based on donor details  

### 2. Blood Requirements
- **Get All Blood Requirements** – ✅ Completed  
  - Displays requested blood requirements  
  - Note: Filters are not yet implemented  

### 3. Donation Tracking & Leaderboard
- **Get Donor Points, Donation History, and Total Donations** – ✅ Completed  
  - Used for leaderboard functionality  
- **Add Donation** – ✅ Completed  
  - Reduces the required blood units by **1** per donation  
  - Increases remaining units by **1**  
  - *(Assumption: 1 donor = 1 unit)*  

### 4. Center Management
- **Register Center** – ✅ Completed  

---

## API Testing

All APIs can be tested using Postman:  
[Postman Collection Link](https://.postman.co/workspace/My-Workspace~17ab8f69-2a9a-4636-8693-c5b0fb7aff01/collection/38648461-940475a3-4087-484a-bf0b-ac8f1a27a97a?action=share&creator=38648461)  

 
