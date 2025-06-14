import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth.jsx";

export default function PrivateRoutes() {

	const { token } = useAuth();

	return (
		<>
		{ token ? (
			<Outlet /> 
		) : (
			<Navigate to="/iniciar-sesion" />
		)}
		</>
	)
}
