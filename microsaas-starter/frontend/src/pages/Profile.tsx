import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";

interface ProfileData {
	username: string;
	email: string;
	projectCount: number;
}

export default function Profile() {
	const [profile, setProfile] = useState<ProfileData | null>(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	const fetchProfile = async () => {
		const data = await getProfile();
		setProfile(data);
		setUsername(data.username);
		setEmail(data.email);
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await updateProfile({ username, email });
			fetchProfile();
			alert("Profile updated successfully!");
		} catch {
			alert("Failed to update profile.");
		}
	};

	if (!profile) return <div>Loading...</div>;

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
			<h1 className="text-3xl font-bold mb-4 text-center">👤 Profile</h1>
			<p className="mb-4 text-gray-700">
				Projects: <span className="font-semibold">{profile.projectCount}</span>
			</p>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full border rounded-lg p-2"
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full border rounded-lg p-2"
					required
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
				>
					Update Profile
				</button>
			</form>
		</div>
	);
}
