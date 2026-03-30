import express from "express";

import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import {
  activateEmergency,
  currentEmergency,
  deactivateEmergency,
} from "../controllers/emergencyController.js";

const router = express.Router();

router.post(
  "/activate",
  authenticate,
  authorize("security"),
  activateEmergency,
);
router.patch(
  "/deactivate",
  authenticate,
  authorize("security"),
  deactivateEmergency,
);
router.get("/current", authenticate, currentEmergency);

export default router;
