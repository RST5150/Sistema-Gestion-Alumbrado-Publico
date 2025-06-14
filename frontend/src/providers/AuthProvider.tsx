import { createContext, useState, useEffect } from "react";

interface ProviderProps {
	empleado:  string | null,
	token:  string,
	login({ empleado, token }: { empleado: string; token: string }): void,
	logout(): void,
}

export const AuthContext = createContext<ProviderProps>({
	empleado: "",
	token: "",
	login: () => {},
	logout: () => {},
});

export default function AuthProvider ({ children }: { children: React.ReactNode}) {
	const [auth, setAuth] = useState({ empleado: "", token: "" });

	const login = ({ empleado, token }: { empleado: string; token: string }) => {
		setAuth({ empleado, token });

		localStorage.setItem("token", token);
		localStorage.setItem("empleado", empleado);
	};

	const logout = () => {
		localStorage.removeItem("empleado");
		localStorage.removeItem("token");
		setAuth({ empleado: "", token: ""});
	};

	useEffect(() => {
		setTimeout(() => {
			const empleado = localStorage.getItem("empleado") ? JSON.parse(localStorage.getItem("empleado")!) : null;
			const token = localStorage.getItem("token");

			if (!empleado || !token) {
				logout();
				return;
			}
			setAuth({ empleado, token });
		}, 1000);
	}, []);

	return (
		<AuthContext value={{ ...auth, login, logout }}>
			{children}
		</AuthContext>
	);
}
