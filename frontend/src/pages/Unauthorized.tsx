import { Link } from "react-router";

export default function Unauthorized() {

	return (
		<>
			<div>
				<h1>Sistema de Gestión de alumbrado público</h1>
				<h2>No autorizado</h2>
				<p>No tiene permiso para visitar esta página</p>
				<Link to="/">Inicio</Link>
			</div>
		</>
	);
}
