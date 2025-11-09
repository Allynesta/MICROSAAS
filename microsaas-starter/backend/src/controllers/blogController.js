import Blog from "../models/blogModel.js";

// ✅ Create new blog post
export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({
            title,
            content,
            author: req.user._id,
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
};

// ✅ Get all blogs (admin only)
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};

// ✅ Get blogs for logged-in user
export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user blogs", error });
    }
};

// ✅ Update blog
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (blog.author.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
};

// ✅ Delete blog
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (blog.author.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};