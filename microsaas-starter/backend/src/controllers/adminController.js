// backend/src/controllers/adminController.js
import User from "../models/User.js";
import Project from "../models/projectModel.js";
import Log from "../models/logModel.js";
import Announcement from "../models/announcementModel.js";
import mongoose from "mongoose";

// List users (basic info)
export const listUsers = async (req, res) => {
    try {
        const users = await User.find().select("username email role createdAt banned");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Promote/Demote user role
export const changeUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!["user", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = role;
        await user.save();
        res.json({ message: "Role updated", user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ban/unban user
export const toggleBanUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.banned = !user.banned;
        await user.save();

        // Log the action
        await Log.create({
            level: "warn",
            message: `User ${user.email} ${user.banned ? "banned" : "unbanned"} by ${req.user.email}`,
            meta: { userId: user._id, actionBy: req.user._id },
        });

        res.json({ message: `User ${user.banned ? "banned" : "unbanned"}`, user: { id: user._id, banned: user.banned } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get simple analytics / stats
export const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProjects = await Project.countDocuments();
        const projectsPerUser = await Project.aggregate([
            { $group: { _id: "$user", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
            { $project: { _id: 0, userId: "$user._id", username: "$user.username", count: 1 } },
        ]);

        // recent errors/logs
        const recentErrors = await Log.find({ level: "error" }).sort({ createdAt: -1 }).limit(10);

        res.json({ totalUsers, totalProjects, topUsersByProjects: projectsPerUser, recentErrors });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create announcement
export const createAnnouncement = async (req, res) => {
    try {
        const { title, body, active = true } = req.body;
        const an = await Announcement.create({ title, body, active, createdBy: req.user._id });
        res.status(201).json(an);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// List announcements
export const listAnnouncements = async (req, res) => {
    try {
        const list = await Announcement.find().sort({ createdAt: -1 }).populate("createdBy", "username email");
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get system logs (admin)
export const getLogs = async (req, res) => {
    try {
        const { level, limit = 100 } = req.query;
        const q = {};
        if (level) q.level = level;
        const logs = await Log.find(q).sort({ createdAt: -1 }).limit(Number(limit));
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
