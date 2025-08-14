Here’s a clean and clear **README.md** for your instructions:

# Backend Setup Guide

## 1. Build the Container

Navigate to the **backend** folder from the location where your GitHub repository is initialized, and build the container:

```bash
cd backend
docker build -t backend-app .
```

## 2. Create the Database

Use the provided SQL file to create the database:

```bash
psql -U <username> -d <database_name> -f path/to/database.sql
```

> Replace `<username>` and `<database_name>` with your actual PostgreSQL username and database name.

## 3. Test the APIs

Once the container and database are ready, run the backend and test the APIs.

To ensure everything works fine, visit:

```
http://localhost/health
```

You should see a JSON reply:

```json
{
  "status": "ok"
}
```

---

Do you also want me to **add Docker run instructions** so that anyone can spin it up without guessing container commands? That would make the README complete.
