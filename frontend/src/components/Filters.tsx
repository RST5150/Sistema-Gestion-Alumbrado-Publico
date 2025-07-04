import { Suspense, useState } from "react";
import { domain, baseDir } from "../utils/config";
import Table from "./Table";
import useAuth from "../hooks/useAuth";

async function fetchDataU(p: string, args: Object) {
	try {
		const { token } = useAuth();
		let url;
		if (Object.keys(args).length) {
			url = `${domain}${baseDir}/${p}/findMany`;
			const res = await fetch(url, {
				method: "POST",
				body: JSON.stringify(args),
				headers: {
					"Content-Type": "application/json",
					"Authorization": token
				}
			});
			if (!res.ok) {
				throw new Error(`Error HTTP, estado: ${res.status}`);
			}
			return res.json();
		} else {
			url = `${domain}${baseDir}/${p}`;
			const res = await fetch(url, {
				method: "GET",
				headers: {
					"Authorization": token
				}
			});
			if (!res.ok) {
				throw new Error(`Error HTTP, estado: ${res.status}`);
			}
			return res.json();
		}
	} catch (error) {
		console.error("Error obteniendo los datos: ", error);
		throw error;
	}
}

export default function Filters({
		product, handleProduct, specs 
	}: {
		product: string, handleProduct: Function, specs: { 
			filters: Record<string, any>, displayName: string, headers: {[key: string]: string[] }, dataKeys: {[key: string]: string[] }, discreteValues: {[key: string]: string[] } | null
		}
	}) {

	const defaultFiltering = {
		fechaInstalacion: "1970-02-02" // Hack horrible para buscar fechaInstalacion nula sin romper validaciones
	}
	const [ filtering, setFiltering ] = useState(defaultFiltering);
	const [ searched, setSearched ] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const filterParams: Record<string, any> = {};
		Object.keys(specs.filters).map(d => { if (formData.get(d)) filterParams[d] = formData.get(d);});
		const filters = {...filtering, ...filterParams}
		setFiltering(filters);
		setSearched(true);
	}

	return (
		<>
			<h3>Consulta de stock de {specs.displayName}</h3>
			{searched ? (
				<Suspense fallback = {<div>Cargando...</div>}>
					<Table dataa={fetchDataU(product, filtering)} specs={specs} referrer="stock" />
					<br/>
					<button type="button" onClick={() => { setSearched(false); setFiltering(defaultFiltering); }}>Volver</button>
				</Suspense>
			) : (
				<>
					<form onSubmit={handleSubmit}>
						{Object.keys(specs.filters).map((key) => (
							<div key={key}>
								<label> {specs.filters[key]} &nbsp;
									{specs.discreteValues != null && specs.discreteValues[key] ? (
										<select name={key} id={key} defaultValue="">
											<option value="">Seleccione</option>
											{specs.discreteValues[key].map((v) => <option key={v} value={v}>{v}</option>)}
										</select>
									) : (
										<input type={key.includes("fecha") ? "date" : "text"} id={key} name={key}/>
									)}
								</label>
							</div>
						))}
						<button type="submit">Consultar</button>
					</form>
					<button type="button" onClick={() => { setSearched(true); setFiltering(defaultFiltering); }}>Buscar todo</button>
					<br/>
					<button type="button" id="resetProduct" onClick={() => { handleProduct(""); setFiltering(defaultFiltering); }}>Volver</button>
				</>
			)}
		</>
	);
}
