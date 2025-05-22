import { Suspense } from "react";
import { domain, baseDir } from "../utils/config";
import Table from "./Table";

async function fetchData(p: string) {
	const url = domain.concat(baseDir).concat("/").concat(p);
	const res = await fetch(url);
	return res.json();
}

export default function Crud({product, handleProduct, specs }: {product: string, handleProduct: Function, specs: { filters: Record<string, any>, productName: string, displayName: string, headers: {[key: string]: string[] }, dataKeys: {[key: string]: string[] }, discreteValues: {[key: string]: string[] } | null}}) {

	return (
		<>
			<h3>Administrar {specs.displayName}</h3>
			<Suspense fallback = {<div>Cargando...</div>}>
				<Table dataa={fetchData(product)} specs={specs} referrer="manage" />
			</Suspense>
			<button type="button" id="resetProduct" onClick={() => handleProduct("")}>Volver</button>
		</>
	);
}
