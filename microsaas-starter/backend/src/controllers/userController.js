import User from "../models/User.js";
import Project from "../models/projectModel.js";

// Get current user profile
export const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const projectCount = await Project.countDocuments({ user: req.user.id });

    res.json({ ...user._doc, projectCount });
};

// Update user profile
export const updateProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, email } = req.body;
    if (username) user.username = username;
    if (email) user.email = email;

    const updatedUser = await user.save();
    res.json({ username: updatedUser.username, email: updatedUser.email });
};

