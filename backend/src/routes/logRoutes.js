import express from "express";
import { fetchLogs } from "../controllers/logController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Fetch activity logs (Admin route based on Dashboard UI)
router.get("/", authenticate, authorize("admin"), fetchLogs);

export default router;
