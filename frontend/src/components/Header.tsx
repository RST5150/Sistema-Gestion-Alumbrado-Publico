import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Header() {
	const { token, logout } = useAuth();
	return (
		<header>
			<nav>
				<NavLink to="/">Inicio</NavLink>
				{ token ? 
					<button type="button" onClick={ () => logout() }>Cerrar sesión</button>
				: 
					<NavLink to="/iniciar-sesion">Iniciar sesión</NavLink>
				}
			</nav>
		</header>
	);
}
