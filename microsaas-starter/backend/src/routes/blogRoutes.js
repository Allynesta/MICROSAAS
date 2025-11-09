import express from "express";
import {
    createBlog,
    getUserBlogs,
    updateBlog,
    deleteBlog,
    getBlogById,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", getBlogById);

// Protected user routes
router.route("/")
    .get(protect, getUserBlogs)
    .post(protect, createBlog);


router.route("/:id")
    .put(protect, updateBlog)
    .delete(protect, deleteBlog);



export default router;
