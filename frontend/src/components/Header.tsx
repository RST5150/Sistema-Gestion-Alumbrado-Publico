import { NavLink } from "react-router";

export default function Header() {
	return (
		<header>
			<nav>
				<ul>
					<li><NavLink to="/">Inicio</NavLink></li>
				</ul>
			</nav>
		</header>
	);
}
