import { useEffect, useState } from "react";
import { fetchUserBlogs, deleteBlog } from "../services/blogService";
import { Link } from "react-router-dom";

interface Blog {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
}

export default function BlogList() {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	const loadBlogs = async () => {
		const data = await fetchUserBlogs();
		setBlogs(data);
	};

	useEffect(() => {
		loadBlogs();
	}, []);

	const handleDelete = async (id: string) => {
		await deleteBlog(id);
		loadBlogs();
	};

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<div className="flex justify-between mb-4">
				<h1 className="text-2xl font-bold">My Blog Posts</h1>
				<Link
					to="/blog/new"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					+ New Post
				</Link>
			</div>

			{blogs.map((blog) => (
				<div key={blog._id} className="border rounded p-4 mb-4">
					<h2 className="text-xl font-semibold">{blog.title}</h2>
					<p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
					<div className="mt-2 flex gap-2">
						<Link to={`/blog/edit/${blog._id}`} className="text-blue-600">
							Edit
						</Link>
						<button
							onClick={() => handleDelete(blog._id)}
							className="text-red-600"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
