import express from "express";
import {
  bookAppointment,
  deleteAppointmentById,
  fetchAppointmentById,
  fetchAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, bookAppointment);
router.get("/", authenticate, fetchAppointments);
router.get("/:id", authenticate, fetchAppointmentById);
router.put("/:id", authenticate, updateAppointmentStatus);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteAppointmentById,
);

export default router;
