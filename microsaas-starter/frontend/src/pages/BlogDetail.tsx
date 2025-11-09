import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../services/blogService";

interface Blog {
	_id: string;
	title: string;
	content: string;
	author?: string;
	createdAt?: string;
}

const BlogDetail = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState<Blog | null>(null);

	useEffect(() => {
		if (id) {
			getBlogById(id).then((data) => setBlog(data));
		}
	}, [id]);

	if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

	return (
		<div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow p-6">
			<h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
			<p className="text-sm text-gray-500 mb-4">
				{blog.author ? `By ${blog.author}` : "Unknown author"} •{" "}
				{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
			</p>
			<p className="whitespace-pre-line text-gray-800">{blog.content}</p>

			<div className="mt-6">
				<Link
					to={`/blogs/edit/${blog._id}`}
					className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
				>
					Edit
				</Link>
				<Link to="/blogs" className="bg-gray-300 py-2 px-4 rounded-lg">
					Back to Blogs
				</Link>
			</div>
		</div>
	);
};

export default BlogDetail;
