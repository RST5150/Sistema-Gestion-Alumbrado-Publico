import { Suspense } from "react";
import { domain, baseDir } from "../utils/config";
import Table from "./Table";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

async function fetchData(p: string) {
	const { token } = useAuth();
	const url = `${domain}${baseDir}/${p}`;
	const res = await fetch(url, {
				method: "GET",
				headers: {
					"Authorization": token
				}
			});
	return res.json();
}

export default function Crud({product, handleProduct, specs }: {product: string, handleProduct: Function, specs: { filters: Record<string, any>, productName: string, displayName: string, displayNameSingular: string, headers: {[key: string]: string[] }, dataKeys: {[key: string]: string[] }, discreteValues: {[key: string]: string[] } | null}}) {

	return (
		<>
			<h3>Administrar {specs.displayName}</h3>
			<button type="button" id="createProduct"><Link to={`crear/${specs.productName}`}>Crear {specs.displayNameSingular}</Link></button>
			<Suspense fallback = {<div>Cargando...</div>}>
				<Table dataa={fetchData(product)} specs={specs} referrer="manage" />
			</Suspense>
			<button type="button" id="resetProduct" onClick={() => handleProduct("")}>Volver</button>
		</>
	);
}
