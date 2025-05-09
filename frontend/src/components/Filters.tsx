import { Suspense, useEffect, useState } from "react";
import { domain, baseDir } from "../utils/config";
import Table from "./Table";

async function fetchDataU(p: string, args: Object) {
	let url;
	if (Object.keys(args).length) {
		url = domain.concat(baseDir).concat("/").concat(p).concat("/findMany");
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(args),
			headers: {
				"Content-Type": "application/json",
			}
		});
		return res.json();
	} else {
		url = domain.concat(baseDir).concat("/").concat(p);
		const res = await fetch(url);
		return res.json();
	}
}

export default function Filters({product, handleProduct, specs }: {product: string, handleProduct: Function, specs: { filters: Record<string, any>, displayName: string, headers: string[], dataKeys: string[] }}) {

	const [ filtering, setFiltering ] = useState({});
	const [ searched, setSearched ] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const filterParams: Record<string, any> = {};
		Object.keys(specs.filters).map(d => { if (formData.get(d)) filterParams[d] = formData.get(d);});
		setFiltering(filterParams);
		setSearched(true);
	}

	useEffect(() => {
        console.log("Updated filtering state: ", filtering);
    }, [filtering]); // This effect runs whenever 'filtering' changes

	return (
		<>
			<h3>Consulta de stock de {specs.displayName}</h3>
			{searched ?
				<Suspense fallback = {<div>Cargando...</div>}>
					<Table dataa={fetchDataU(product, filtering)} specs={specs}></Table>
					<button type="button" onClick={() => setSearched(false)}>Volver</button>
				</Suspense>
			: <>
				<form onSubmit={handleSubmit}>
					{Object.keys(specs.filters).map((key) => 
						<label key={key}> {specs.filters[key]} 
							<input type={key.includes("fecha") ? "date" : "text"} id={key} name={key}/> 
						</label>
					)}
					<button type="submit">Consultar</button>
				</form>
				<button type="button" onClick={() => {setSearched(true); setFiltering({})}}>Buscar todo</button>
				<br/>
				<button type="button" id="resetProduct" onClick={() => handleProduct("")}>Volver</button>
			</>
			}
		</>
	);
}
