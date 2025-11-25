import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, User, LayoutDashboard, FileText, Shield } from "lucide-react";

export default function NavBar() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const hours = new Date().getHours();
		setGreeting(
			hours < 12
				? "Good Morning"
				: hours < 18
				? "Good Afternoon"
				: "Good Evening"
		);
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const navLinksOff = [
		{ name: "Registration", path: "/register", icon: <FileText size={16} /> },
		{ name: "Login", path: "/login", icon: <Shield size={16} /> },
	];

	const navLinks = [
		{
			name: "Dashboard",
			path: "/dashboard",
			icon: <LayoutDashboard size={16} />,
		},
		{ name: "Profile", path: "/profile", icon: <User size={16} /> },
		{ name: "Blog", path: "/blogs", icon: <FileText size={16} /> },
		{ name: "Admin", path: "/admin", icon: <Shield size={16} /> },
	];

	// --- If user not logged in ---
	if (!user)
		return (
			<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Nav links */}
						<div className="flex items-center space-x-2 sm:space-x-4">
							{navLinksOff.map((link) => (
								<button
									key={link.name}
									onClick={() => navigate(link.path)}
									className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out ${
										location.pathname.startsWith(link.path)
											? "bg-blue-100 text-blue-700 shadow-lg"
											: "text-gray-700 hover:text-blue-700 hover:bg-gray-100"
									}`}
								>
									{link.icon}
									<span>{link.name}</span>
								</button>
							))}
						</div>
						{/* Left side */}
						<span className="text-sm text-gray-700 font-medium">
							{greeting} 👋
						</span>
					</div>
				</div>
			</nav>
		);

	// --- If user is logged in ---
	return (
		<nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Center links */}
					<div className="hidden sm:flex items-center space-x-1 sm:space-x-3">
						{navLinks.map((link) => (
							<button
								key={link.name}
								onClick={() => navigate(link.path)}
								className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
									location.pathname.startsWith(link.path)
										? "bg-blue-100 text-blue-700 shadow-lg"
										: "text-gray-700 hover:text-blue-700 hover:bg-gray-100"
								}`}
							>
								{link.icon}
								<span>{link.name}</span>
							</button>
						))}
					</div>

					<div className="flex items-center space-x-2 sm:space-x-4">
						<span className="text-sm sm:text-base text-gray-700">
							<span className="text-sm sm:text-base text-gray-700">
								{greeting} 👋{" "}
								<span className="text-blue-600 font-semibold">
									{user.username}
								</span>
							</span>
							<button
								onClick={handleLogout}
								className="flex items-center space-x-2 bg-blue-600 text-white text-sm font-medium py-2 px-3 sm:px-4 rounded-md hover:bg-blue-700 shadow-sm transition-all duration-200"
							>
								<LogOut size={16} />
								<span>Logout</span>
							</button>
						</span>
					</div>
				</div>
			</div>
		</nav>
	);
}
