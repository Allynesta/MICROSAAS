// backend/src/models/announcementModel.js
import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
