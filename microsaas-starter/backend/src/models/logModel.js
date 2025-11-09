// backend/src/models/logModel.js
import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
    {
        level: { type: String, default: "info" }, // info, warn, error
        message: { type: String, required: true },
        meta: { type: Object }, // optional additional context
    },
    { timestamps: true }
);

export default mongoose.model("Log", logSchema);
