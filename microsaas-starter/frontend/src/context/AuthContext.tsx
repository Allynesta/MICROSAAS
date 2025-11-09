import {
	createContext,
	useState,
	useEffect,
	useContext,
	type ReactNode,
} from "react";

interface User {
	username: string;
	id: string;
	email: string;
	role: string; // add the role property
	// add other user properties here
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (user: User, token: string) => void;
	logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
	user: null,
	token: null,
	login: () => {},
	logout: () => {},
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");
		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (user: User, token: string) => {
		setUser(user);
		setToken(token);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.clear();
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
