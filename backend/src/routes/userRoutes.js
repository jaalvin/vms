import express from "express";
import {
  addUser,
  deleteUser,
  fetchUserById,
  fetchUsers,
  updateUser,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), fetchUsers);
router.get("/:id", authenticate, fetchUserById);
router.post("/", authenticate, authorize("admin"), addUser);
router.put("/:id", authenticate, authorize("admin"), updateUser);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
