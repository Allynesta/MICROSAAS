// frontend/src/components/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
	const { token, user } = useAuth();
	if (!token) return <Navigate to="/" replace />;
	if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
	return children;
}
