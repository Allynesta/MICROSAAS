import Project from "../models/projectModel.js";

// Create new project
export const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all user projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update project
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (project.user.toString() !== req.user.id)
            return res.status(401).json({ message: "Not authorized" });

        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (project.user.toString() !== req.user.id)
            return res.status(401).json({ message: "Not authorized" });

        await project.deleteOne();
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
