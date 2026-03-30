import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import orgSettingsRoutes from "./routes/orgSettingsRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import logRoutes from "./routes/logRoutes.js";

const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || "https://vms-group45new.netlify.app" }));
app.use(express.json({ urlencoded: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/settings", orgSettingsRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/logs", logRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
