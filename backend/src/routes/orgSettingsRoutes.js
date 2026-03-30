import express from "express";

import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import {
  fetchOrgSettings,
  updateOrgSettings,
} from "../controllers/orgSettingsController.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), fetchOrgSettings);
router.put("/", authenticate, authorize("admin"), updateOrgSettings);

export default router;
