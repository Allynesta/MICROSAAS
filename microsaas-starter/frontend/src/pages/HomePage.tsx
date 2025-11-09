import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

interface ProfileData {
	username: string;
	email: string;
	projectCount: number;
}

export default function Homepage() {
	const [profile, setProfile] = useState<ProfileData | null>(null);

	const fetchProfile = async () => {
		const data = await getProfile();
		setProfile(data);
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	if (!profile) return <div>Loading... </div>;

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
			<h1 className="text-3xl font-bold mb-4 text-center">👤 Profile</h1>
			<p className="mb-4 text-gray-700">
				Projects: <span className="font-semibold">{profile.projectCount}</span>
			</p>
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<div className="text-center p-6 rounded-2xl shadow-lg bg-white">
					<h1 className="text-3xl font-bold mb-4">MicroSaaS Bootcamp 🚀</h1>
				</div>
			</div>
		</div>
	);
}
