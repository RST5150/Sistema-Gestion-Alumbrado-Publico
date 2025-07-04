import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Home() {
	const { token, rol } = useAuth();

	function Options( { rol }: { rol: string } ) {

		return (
			rol === "Director" ? (
				<div>
					<Link to="/gestion"><button type="button">Asignar mantenimientos</button></Link>
					<Link to="/gestion"><button type="button">Gestionar equipamiento</button></Link>
					<Link to="/gestion"><button type="button">Gestionar mantenimientos</button></Link>
				</div>
			) : rol === "Almacenes" ? (
				<div>
					<Link to="/stock"><button type="button">Stock</button></Link>
					<Link to="/administracion"><button type="button">Administración</button></Link>
				</div>
			) : rol === "Empleado" ? (
				<div>
					<Link to="/gestion"><button type="button">Registrar mantenimiento</button></Link>
				</div>
			) : <p>No se pudo establecer el rol del empleado</p>
		);
	}
	
	return (
		<>
			<div>
				<h1>Sistema de Gestión de alumbrado público</h1>
				<h2>Inicio</h2>
				<p>Acá va algo de descripción</p>
				{ token ? (
					<Options rol={ rol } />
				) : <p>Inicia sesión para operar. <Link to="/iniciar-sesion">Iniciar sesión</Link></p> }
				<Link to="/">Inicio</Link>
			</div>
		</>
	);
}
