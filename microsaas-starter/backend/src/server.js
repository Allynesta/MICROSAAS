import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("🚀 MicroSaaS API is running successfully!");
});

app.use("/api/projects", projectRoutes);

app.use("/api/users", userRoutes);

app.use(requestLogger);

app.use("/api/admin", adminRoutes);

app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
    })
    .catch((err) => console.log("❌ MongoDB error:", err));
