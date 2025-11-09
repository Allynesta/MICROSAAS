import { useState } from "react";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const data = await registerUser(username, email, password);
			login(data.user, data.token);
			alert("Registration successful!");
		} catch (error: unknown) {
			if (typeof error === "object" && error !== null && "response" in error) {
				const err = error as { response?: { data?: { message?: string } } };
				alert(err.response?.data?.message || "Error registering");
			} else {
				alert("Error registering");
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-50">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-2xl shadow-lg w-96"
			>
				<h1 className="text-2xl font-bold mb-6">Register</h1>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="border w-full p-2 mb-3 rounded"
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border w-full p-2 mb-3 rounded"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border w-full p-2 mb-3 rounded"
				/>
				<button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
