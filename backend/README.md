# visitor-management-system
A web-based Visitor Management System for managing and tracking visitor records efficiently.

## MongoDB Atlas setup

This backend uses `MONGO_URI` for its MongoDB connection, so switching from local MongoDB to MongoDB Atlas is mainly an environment-variable change.

1. Create a `.env` file in the project root.
2. Copy the keys from `.env.example`.
3. Replace `MONGO_URI` with your Atlas connection string.
4. Run `npm run dev`.

Example Atlas URI format:

`mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=<app-name>`

Atlas checklist:

- Add teammate IP addresses in Atlas Network Access, or temporarily allow `0.0.0.0/0` for development.
- Confirm the Atlas database user has read/write permissions.
- URL-encode special characters in the database password before putting it in `MONGO_URI`.
