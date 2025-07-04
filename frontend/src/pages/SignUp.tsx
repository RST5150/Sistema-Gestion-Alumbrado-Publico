import useAuth from "../hooks/useAuth";
import { baseDir, domain } from "../utils/config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignUp() {

	const [ error, setError ] = useState("");
	const [ message, setMessage ] = useState("");
	const [ isCreated, setCreated ] = useState(false);
	const navigate = useNavigate();
	const { token } = useAuth();

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const dni = formData.get("dni");
		const clave = formData.get("clave");
		const claveRep = formData.get("claveRep");
		if (clave !== claveRep) {
			setMessage("Las claves no coinciden");
			return;
		}
		const credentials = { dni, clave };
		const url = `${domain}${baseDir}/empleados/signup`;
		try {
			const res = await fetch(url, {
				method: "POST",
				body: JSON.stringify(credentials),
				headers: {
					"Content-Type": "application/json",
				}
			});
			const signupData = await res.json();
			if (!res.ok) {
				setError(signupData.message);
				if (res.status === 400 ) {
					setMessage("No se puede activar la cuenta con esos datos");
					return;
				}
				if (res.status === 404 ) {
					setMessage("No se puede activar la cuenta con esos datos");
					return;
				}
				if (res.status === 409 ) {
					setMessage("No se puede activar nuevamente la cuenta para ese empleado");
					return;
				}
				if (res.status >= 500 ) {
					setMessage("Error interno durante la activación de la cuenta. Intente más tarde");
					return;
				}
			}
			setCreated(true);
		} catch (error) {
			console.error("Error activando la cuenta: ", error);
			throw error;
		}
	};

	return (
		<div>
			<h1>Activar cuenta de empleado</h1>
			{ isCreated ? (
				<>
				<h2>Activación exitosa</h2>
				<Link to="/iniciar-sesion">Iniciar sesión</Link>
				</>
			) : (
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
					<div>
						<label>Repetir contraseña
							<input type="password" name="claveRep" id="claveRep" required />
						</label>
					</div>
					<button type="submit">Activar cuenta</button>
					{ message && <p>{message}</p>}
					{ error && <p>{error}</p>}
				</form>
			)}
		</div>
	);
}
