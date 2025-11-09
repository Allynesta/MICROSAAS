// backend/src/routes/adminRoutes.js
import express from "express";
import {
    listUsers,
    changeUserRole,
    toggleBanUser,
    getStats,
    createAnnouncement,
    listAnnouncements,
    getLogs,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";


const router = express.Router();

router.use(protect, isAdmin);

// User management
router.get("/users", listUsers);
router.put("/users/:id/role", changeUserRole);
router.put("/users/:id/ban", toggleBanUser);

// Analytics
router.get("/stats", getStats);

// Announcements
router.post("/announcements", createAnnouncement);
router.get("/announcements", listAnnouncements);

// Logs
router.get("/logs", getLogs);

router.get("/stats", getStats); // 👈 this is the important one


export default router;
