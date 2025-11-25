import { useEffect, useState } from "react";
import { fetchMessage } from "./services/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import BlogList from "./pages/BlogList";
import BlogForm from "./pages/BlogForm";
import BlogDetail from "./pages/BlogDetail";
import Homepage from "./pages/HomePage";

function App() {
	const [, setMessage] = useState<string>("Loading...");

	useEffect(() => {
		const getMessage = async () => {
			try {
				const data = await fetchMessage();
				setMessage(data);
			} catch {
				setMessage("❌ Could not fetch API message.");
			}
		};
		getMessage();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 text-slate-900 font-sans">
			<AuthProvider>
				<BrowserRouter>
					<NavBar />

					<main className="container mx-auto px-4 py-8 animate-fade-in">
						<Routes>
							{/* public/auth */}
							<Route path="/" element={<Homepage />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />

							{/* regular user */}
							<Route
								path="/dashboard"
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							></Route>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>

							{/* admin area */}
							<Route
								path="/admin"
								element={
									<AdminRoute>
										<AdminDashboard />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/users"
								element={
									<AdminRoute>
										<AdminUsers />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/announcements"
								element={
									<AdminRoute>
										<AdminAnnouncements />
									</AdminRoute>
								}
							/>

							<Route
								path="/blogs"
								element={
									<ProtectedRoute>
										<BlogList />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/blog/new"
								element={
									<ProtectedRoute>
										<BlogForm />
									</ProtectedRoute>
								}
							/>

							<Route
								path="/blog/edit/:id"
								element={
									<ProtectedRoute>
										<BlogForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/blogs/:id"
								element={
									<ProtectedRoute>
										<BlogDetail />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</main>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
