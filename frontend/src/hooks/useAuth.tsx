import { use } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function useAuth() {
	return use(AuthContext);
}
