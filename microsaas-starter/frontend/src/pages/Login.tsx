import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const data = await loginUser(email, password);
			login(data.user, data.token);
			alert("Login successful!");
			navigate("/");
		} catch (error: unknown) {
			if (typeof error === "object" && error !== null && "response" in error) {
				const err = error as { response?: { data?: { message?: string } } };
				alert(err.response?.data?.message || "Error logging in");
			} else {
				alert("Error logging in");
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-50">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-2xl shadow-lg w-96"
			>
				<h1 className="text-2xl font-bold mb-6">Login</h1>
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
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
