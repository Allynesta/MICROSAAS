// frontend/src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { fetchStats } from "../services/adminService";
import { useNavigate } from "react-router-dom";

interface TopUser {
	userId: string;
	username: string;
	count: number;
}

interface RecentError {
	id: string;
	message: string;
	timestamp: string;
	// Add more fields as needed based on your error object structure
}

interface Stats {
	totalUsers: number;
	totalProjects: number;
	recentErrors: RecentError[];
	topUsersByProjects: TopUser[];
}

export default function AdminDashboard() {
	const [stats, setStats] = useState<Stats | null>(null);

	const navigate = useNavigate();

	const load = async () => {
		try {
			const data = await fetchStats();
			setStats(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		load();
	}, []);

	if (!stats) return <div className="p-6">Loading stats...</div>;

	return (
		<div className="max-w-4xl mx-auto mt-8">
			<h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
			<button
				onClick={() => navigate("/admin/announcements")}
				className="text-sm"
			>
				Admin Announcements
			</button>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="p-4 bg-white rounded shadow">
					<div className="text-sm text-gray-500">Total Users</div>
					<div className="text-2xl font-semibold">{stats.totalUsers}</div>
				</div>
				<button onClick={() => navigate("/admin/users")} className="text-sm">
					Manage Users
				</button>
				<div className="p-4 bg-white rounded shadow">
					<div className="text-sm text-gray-500">Total Projects</div>
					<div className="text-2xl font-semibold">{stats.totalProjects}</div>
				</div>
				<div className="p-4 bg-white rounded shadow">
					<div className="text-sm text-gray-500">Recent Errors</div>
					<div className="text-2xl font-semibold">
						{stats.recentErrors?.length || 0}
					</div>
				</div>
			</div>

			<section className="bg-white p-4 rounded shadow">
				<h2 className="font-semibold mb-2">Top users by projects</h2>
				<ul>
					{stats.topUsersByProjects?.map((u: TopUser) => (
						<li key={u.userId} className="py-2 border-b">
							{u.username} — {u.count} projects
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
