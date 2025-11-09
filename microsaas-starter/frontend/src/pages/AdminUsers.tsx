// frontend/src/pages/AdminUsers.tsx
import { useEffect, useState } from "react";
import { fetchUsers, changeRole, toggleBan } from "../services/adminService";

interface User {
	_id: string;
	username: string;
	email: string;
	role: string;
	createdAt: string;
	banned: boolean;
}

export default function AdminUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const load = async () => {
		try {
			setUsers(await fetchUsers());
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const handleRole = async (id: string, role: string) => {
		await changeRole(id, role);
		load();
	};

	const handleBan = async (id: string) => {
		await toggleBan(id);
		load();
	};

	return (
		<div className="max-w-4xl mx-auto mt-8">
			<h1 className="text-2xl font-bold mb-4">User Management</h1>
			<div className="bg-white p-4 rounded shadow">
				<table className="w-full">
					<thead>
						<tr className="text-left">
							<th className="py-2">Username</th>
							<th>Email</th>
							<th>Role</th>
							<th>Created</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((u) => (
							<tr key={u._id} className="border-t">
								<td className="py-2">{u.username}</td>
								<td>{u.email}</td>
								<td>{u.role}</td>
								<td>{new Date(u.createdAt).toLocaleString()}</td>
								<td className="space-x-2">
									<button
										onClick={() =>
											handleRole(u._id, u.role === "admin" ? "user" : "admin")
										}
										className="px-2 py-1 bg-gray-100 rounded"
									>
										{u.role === "admin" ? "Demote" : "Promote"}
									</button>
									<button
										onClick={() => handleBan(u._id)}
										className="px-2 py-1 bg-red-100 rounded"
									>
										{u.banned ? "Unban" : "Ban"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
