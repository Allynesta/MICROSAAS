import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            if (req.user.banned) return res.status(403).json({ message: "Account banned" });

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    if (!token) res.status(401).json({ message: "Not authorized, no token" });
};

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Not authenticated" });
        if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};