import { Link } from "react-router";

export default function Home() {
	return (
		<>
			<div>
				<h1>Sistema de Gestión de alumbrado público</h1>
				<h2>Inicio</h2>
				<p>Acá va algo de descripción</p>
				<Link to="/">Inicio</Link>&nbsp;
				<Link to="/stock">Stock</Link>&nbsp;
				<Link to="/administracion">Administración</Link>
			</div>
		</>
	);
}
