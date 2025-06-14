import useAuth from "../hooks/useAuth";
import { baseDir, domain } from "../utils/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function LogIn() {

	const [ error, setError ] = useState("");
	const [ message, setMessage ] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const dni = formData.get("dni");
		const clave = formData.get("clave");
		const user = { dni, clave };
		const url = `${domain}${baseDir}/empleados/login`;
		try {
			const res = await fetch(url, {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json",
				}
			});
			const loginData = await res.json();
			if (!res.ok) {
				setError(loginData.message);
				if (res.status === 404 ) {
					setMessage("Usuario o contraseña incorrecto");
					return;
				}
				if (res.status === 400 ) {
					setMessage("Error al iniciar sesión");
					return;
				}
				if (res.status >= 500 ) {
					setMessage("Error interno durante el inicio de sesión");
					return;
				}
			}
			login(loginData);
			navigate("/");
		} catch (error) {
			console.error("Error iniciando sesión: ", error);
			throw error;
		}
	};

	return (
		<div>
			<h1>Iniciar sesión</h1>
			<p>¿No tenés la cuenta activa? <Link to="/activar-cuenta">Activar cuenta</Link></p>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Número de documento
						<input type="text" name="dni" id="dni" required />
					</label>
				</div>
				<div>
					<label>Contraseña
						<input type="password" name="clave" id="clave" required />
					</label>
				</div>
				<button type="submit">Iniciar sesión</button>
				{ message && <p>{message}</p>}
				{ error && <p>{error}</p>}
			</form>
		</div>
	);
}
