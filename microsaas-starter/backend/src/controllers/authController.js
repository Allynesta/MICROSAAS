import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route POST /api/auth/register
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);

        res.status(201).json({
            user: { id: user._id, username: user.username, email: user.email },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if (user.banned) return res.status(403).json({ message: "Account banned" });


        const token = generateToken(user._id);
        res.status(200).json({
            user: { id: user._id, username: user.username, email: user.email, role: user.role, banned: user.banned },
            token,

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
