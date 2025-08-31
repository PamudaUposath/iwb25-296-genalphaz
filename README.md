# Blood Donation Platform (Lanka Blood Donate)

A comprehensive blood donation platform built to connect donors with blood donation centers, track blood requirements, and provide real-time notifications.

---

## Project Overview

The platform consists of three main components:

1. **Backend (Ballerina)**
   - Handles donor management, center management, blood requirement tracking, donation logs, and QR token generation.
   - Provides REST APIs for web and mobile apps.
   - Real-time notifications via WebSocket/Kafka.
   - PostgreSQL database for persistent storage.

2. **Web App (React)**
   - Built with React and CSS.
   - Donor-facing portal for viewing blood requirements, centers, and donation history.

3. **Mobile App (React Native)**
   - Cross-platform mobile application for donors.
   - Supports signing up, tracking donations, scanning QR codes, and receiving notifications.

---

## Team GenAlphaZ

- **Team Leader:** Pamuda U de A Goonatilake  
- **Team Members:**  
  - Malshi Kavindya Wijesinghe  
  - Pasidu Chamod  
  - Bhagya Sandakelum  

---

## Architecture Diagram

```text
                  ┌───────────────────┐
                  │   Web App (React) │
                  └─────────┬─────────┘
                            │ REST API
                  ┌─────────▼─────────┐
                  │   Mobile App      │
                  │ (React Native)    │
                  └─────────┬─────────┘
                            │ REST API / WebSocket
                  ┌─────────▼─────────┐
                  │ Backend Services   │
                  │  (Ballerina)      │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │  PostgreSQL DB     │
                  │ (Dockerized)       │
                  └───────────────────┘
````

---

## Database Structure (Summary)

* **Centers:** Blood donation centers, hospitals
* **Blood Requirements:** Requirements posted by centers
* **Donors:** User information
* **Donations:** Confirmed donation logs
* **QR Tokens:** Short-lived tokens for scanning
* **Center Blood Stock:** Aggregated stock cache

---

## Setup

### Backend

1. Clone the repository and navigate to `backend/public-api-service`
2. Update `Ballerina.toml` dependencies.
3. Run `bal build` and then `bal run` to start the backend.
4. Ensure PostgreSQL container is running via Docker with the database initialized.

### Web App

1. Navigate to `web` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the web app.

### Mobile App

1. Navigate to `mobile` folder.
2. Run `npm install` to install dependencies.
3. Run `npx expo start` to start the React Native app.

---

## Endpoints


### 1. Blood Requirements API
- **GET** `/blood_requirements/{id}` → Retrieve details of a specific blood requirement.  
- **POST** `/blood_requirements` → Create a new blood requirement entry.  
- **PUT** `/blood_requirements/{id}` → Update an existing blood requirement.  
- **DELETE** `/blood_requirements/{id}` → Delete a blood requirement.  


### 2. Donors API
- **GET** `/donors/{id}` → Retrieve donor details by ID.  
- **POST** `/donors` → Add a new donor.  
- **PUT** `/donors/{id}` → Update donor information.  
- **DELETE** `/donors/{id}` → Remove a donor from the system.  


### 3. Donations API
- **POST** `/donations` → Record a new donation.  
- **GET** `/donations/points/{donorId}` → Retrieve total reward points of a donor.  
- **GET** `/donations/count/{donorId}` → Get the total number of donations made by a donor.  
- **GET** `/donations/history/{donorId}` → Retrieve the donation history of a donor.  



### 4. Centers API
- **GET** `/centers/{id}` → Retrieve details of a specific donation center.  
- **POST** `/centers` → Add a new donation center.  
- **PUT** `/centers/{id}` → Update details of an existing donation center.  
- **DELETE** `/centers/{id}` → Remove a donation center.  



**Notification Service:**

* WebSocket / Kafka integration for real-time alerts

---

## Resources

* Blood bank center data: [NBTS Centers](https://nbts.health.gov.lk/wp-admin/admin-ajax.php?action=get_blood_banks)

---

## License

MIT License

```
MIT License

Copyright (c) 2025 Pamuda U de A Goonatilake and team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
