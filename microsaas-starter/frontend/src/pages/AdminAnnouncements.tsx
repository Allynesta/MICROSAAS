// frontend/src/pages/AdminAnnouncements.tsx
import { useEffect, useState } from "react";
import {
	fetchAnnouncements,
	createAnnouncement,
} from "../services/adminService";

export default function AdminAnnouncements() {
	type Announcement = {
		_id: string;
		title: string;
		body: string;
		createdBy?: { username?: string };
		createdAt: string;
	};

	const [list, setList] = useState<Announcement[]>([]);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const load = async () => {
		setList(await fetchAnnouncements());
	};

	useEffect(() => {
		load();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createAnnouncement({ title, body });
		setTitle("");
		setBody("");
		load();
	};

	return (
		<div className="max-w-3xl mx-auto mt-8">
			<h1 className="text-2xl font-bold mb-4">Announcements</h1>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-4 rounded shadow mb-6"
			>
				<input
					className="w-full border p-2 mb-2"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<textarea
					className="w-full border p-2 mb-2"
					placeholder="Body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required
				/>
				<button className="px-4 py-2 bg-blue-600 text-white rounded">
					Create
				</button>
			</form>

			<div className="bg-white p-4 rounded shadow">
				{list.map((a) => (
					<div key={a._id} className="border-b py-3">
						<div className="font-semibold">{a.title}</div>
						<div className="text-sm text-gray-600">{a.body}</div>
						<div className="text-xs text-gray-400">
							By: {a.createdBy?.username || "system"} —{" "}
							{new Date(a.createdAt).toLocaleString()}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
