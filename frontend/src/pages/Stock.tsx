import { ReactNode, Suspense, use, useEffect, useState } from "react";
import { Link } from "react-router";
import { domain, baseDir } from "../utils/config";
import Table from "../components/Table";

async function fetchDataU(p: string) {
	const url = domain.concat(baseDir).concat("/").concat(p);
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Error al obtener los datos de " + url);
	}
	return response.json();
}

export default function Stock() {

	const [ product, setProduct ] = useState("");

	const productNames: { [key: string]: string } = {
		columnas: "columnas" ,
		equiposAuxiliares: "equipos auxiliares",
		luminarias: "luminarias",
		servicios: "servicios"
	};

	function handleSetProduct(p: string) {
		setProduct(() => p);
	}

	/*
	No utilizado en favor de use()
	const [ data, setData ] = useState([]);
	useEffect (() => {
		async function fetchData() {
			const url = domain.concat(baseDir).concat("/").concat(product);
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Error al obtener los datos de " + url);
			}
			const jsonResponse = await response.json();
			setData(() => jsonResponse.data);
		}
		//if (product) fetchData();
	}, [product]);
	*/

	return (
		<>
			<div>
				<h1>Sistema de Gestión de alumbrado público</h1>
				<h2>Stock {product ? "de " + productNames[product] : ""}</h2>
				<p>Acá va algo de descripción</p>
				{product ? 
					<>
						<Suspense fallback = {<div>Cargando...</div>}>
							<Table product={product} dataa={fetchDataU(product)}></Table>
						</Suspense>
						<button type="button" id="resetProduct" onClick={() => handleSetProduct("")}>Volver</button>
					</>
					:
					<div>
						<h3>Seleccione una categoría de producto para ver el stock</h3>
						<button type="button" id="equiposAuxiliares" onClick={() => handleSetProduct("equiposAuxiliares")}>Equipos auxiliares</button>
						<button type="button" id="columnas" onClick={() => handleSetProduct("columnas")}>Columnas</button>
						<button type="button" id="luminarias" onClick={() => handleSetProduct("luminarias")}>Luminarias</button>
					</div>
				}
				<Link to="/">inicio</Link>
			</div>
		</>
	);
}
