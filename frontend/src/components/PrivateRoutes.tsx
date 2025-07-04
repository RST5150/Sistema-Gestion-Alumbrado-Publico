import useAuth from "../hooks/useAuth.jsx";
import { Navigate, Outlet } from "react-router";

interface PrivateRoutesProps {
	requiredRole?: string;
}

export default function PrivateRoutes({ requiredRole }: PrivateRoutesProps) {
	const { token, rol } = useAuth();
	if (!token) {
		return <Navigate to="/iniciar-sesion" replace />;
	}
	if (requiredRole && rol !== requiredRole) {
		return <Navigate to="/no-autorizado" replace />;
	}
	return <Outlet />;
}
