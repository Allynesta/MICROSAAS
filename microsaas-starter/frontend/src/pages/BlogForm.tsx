import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	createBlog,
	updateBlog,
	fetchUserBlogs,
} from "../services/blogService";

export default function BlogForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		const loadBlog = async () => {
			if (id) {
				const blogs = await fetchUserBlogs();
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const blog = blogs.find((b: any) => b._id === id);
				if (blog) {
					setTitle(blog.title);
					setContent(blog.content);
				}
			}
		};
		loadBlog();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (id) await updateBlog(id, { title, content });
		else await createBlog({ title, content });
		navigate("/blogs");
	};

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">
				{id ? "Edit Blog" : "New Blog"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					className="border p-2 rounded"
					required
				/>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write your content..."
					className="border p-2 rounded h-40"
					required
				/>
				<button
					className="bg-green-500 text-white px-4 py-2 rounded"
					type="submit"
				>
					{id ? "Update" : "Publish"}
				</button>
			</form>
		</div>
	);
}
