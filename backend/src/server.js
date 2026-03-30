import dotenv from "dotenv";
import { createServer } from "http";
import app from "./app.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

const startServer = async () => {
  await connectDB();

  const server = createServer(app);
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, "0.0.0.0", () => {
    console.info(`Server running on port ${PORT}`);
  });
};

startServer();
