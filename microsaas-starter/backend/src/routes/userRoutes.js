import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user profile
router.get("/profile", protect, getProfile);

// Update user profile
router.put("/profile", protect, updateProfile);

export default router;
