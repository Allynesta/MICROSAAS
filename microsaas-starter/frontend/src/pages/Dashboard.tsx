import { useEffect, useState } from "react";
import {
	getProjects,
	createProject,
	deleteProject,
	updateProject,
} from "../services/projectService";
import { Link } from "react-router-dom";

interface Project {
	_id: string;
	title: string;
	description: string;
}

export default function Dashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [editing, setEditing] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		const data = await getProjects();
		setProjects(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (editing) {
			await updateProject(editing, { title, description });
		} else {
			await createProject({ title, description });
		}
		setTitle("");
		setDescription("");
		setEditing(null);
		fetchData();
	};

	const handleEdit = (p: Project) => {
		setEditing(p._id);
		setTitle(p.title);
		setDescription(p.description);
	};

	const handleDelete = async (id: string) => {
		await deleteProject(id);
		fetchData();
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
			<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
				📊 Dashboard
			</h1>

			{/* Form */}
			<form
				onSubmit={handleSubmit}
				className="bg-gray-50 p-5 rounded-2xl shadow-sm mb-8 space-y-4 border border-gray-200"
			>
				<h2 className="text-lg font-semibold text-gray-700">
					{editing ? "✏️ Edit Project" : "🆕 Add New Project"}
				</h2>

				<input
					type="text"
					placeholder="Project Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					required
				/>
				<textarea
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
				>
					{editing ? "Update Project" : "Add Project"}
				</button>
			</form>

			{/* Blog Redirect */}
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold text-gray-800">Your Projects</h2>
				<Link to="/blogs" className="text-blue-600 font-medium hover:underline">
					Go to Blogs →
				</Link>
			</div>

			{/* Loading State */}
			{loading ? (
				<p className="text-center text-gray-500">Loading projects...</p>
			) : projects.length === 0 ? (
				<p className="text-center text-gray-500">
					No projects yet. Start by adding one above!
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{projects.map((p) => (
						<div
							key={p._id}
							className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all"
						>
							<h3 className="font-semibold text-lg text-gray-800 mb-2">
								{p.title}
							</h3>
							<p className="text-gray-600 text-sm mb-4">
								{p.description || "No description provided."}
							</p>
							<div className="flex justify-end space-x-3">
								<button
									onClick={() => handleEdit(p)}
									className="text-blue-600 hover:text-blue-800 font-medium"
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(p._id)}
									className="text-red-600 hover:text-red-800 font-medium"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
