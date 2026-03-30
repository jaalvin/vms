import express from "express";
import {
  addVisitor,
  checkOutVisitor,
  deleteVisitor,
  fetchVisitors,
  fetchVisitorById,
} from "../controllers/visitorsController.js";
import { cloudinaryUpload } from "../config/multer.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

const uploadProfile = cloudinaryUpload({
  folder: "profiles",
  allowedFormats: ["jpg", "jpeg"],
}).single("profile");

router.post("/", authenticate, uploadProfile, addVisitor);
router.get("/", authenticate, fetchVisitors);
router.put("/checkout/:id", authenticate, checkOutVisitor);
router.get("/:id", authenticate, fetchVisitorById);
router.delete("/:id", authenticate, authorize(["admin"]), deleteVisitor);

export default router;
