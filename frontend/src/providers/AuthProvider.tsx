import { createContext, useState, useEffect } from "react";

interface ProviderProps {
	empleado: string | null;
	token: string;
	rol: string;
	login({ empleado, token, rol }: { empleado: string; token: string; rol: string }): void;
	logout(): void;
}

export const AuthContext = createContext<ProviderProps>({
	empleado: "",
	token: "",
	rol: "",
	login: () => {},
	logout: () => {},
});

export default function AuthProvider ({ children }: { children: React.ReactNode}) {
	const [auth, setAuth] = useState({ empleado: "", token: "", rol: "" });

	const login = ({ empleado, token, rol }: { empleado: string; token: string, rol: string }) => {
		setAuth({ empleado, token, rol });

		localStorage.setItem("token", token);
		localStorage.setItem("empleado", empleado);
		localStorage.setItem("rol", rol);
	};

	const logout = () => {
		setAuth({ empleado: "", token: "", rol: "" });
		
		localStorage.removeItem("empleado");
		localStorage.removeItem("token");
		localStorage.removeItem("rol");
	};

	useEffect(() => {
		setTimeout(() => {
			const empleado = localStorage.getItem("empleado") ? JSON.parse(localStorage.getItem("empleado")!) : null;
			const token = localStorage.getItem("token");
			const rol = localStorage.getItem("rol");

			if (!empleado || !token || !rol) {
				logout();
				return;
			}
			setAuth({ empleado, token, rol });
		}, 1000);
	}, []);

	return (
		<AuthContext value={{ ...auth, login, logout }}>
			{children}
		</AuthContext>
	);
}
