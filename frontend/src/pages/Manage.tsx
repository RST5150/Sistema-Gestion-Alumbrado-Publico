import { useState } from "react";
import { Link } from "react-router";
import Crud from "../components/Crud";
import { productSpecs } from "../utils/config";

export default function Manage() {

	const [ product, setProduct ] = useState("");	

	function handleSetProduct(p: string) {
		setProduct(p);
	}

	return (
		<>
			<div>
				<h1>Sistema de Gestión de alumbrado público</h1>
				<h2>Administración {product ? "de " + productSpecs[product].displayName : ""}</h2>
				<p>Acá va algo de descripción</p>
				{product ? 
					<Crud product={product} handleProduct={handleSetProduct} specs={productSpecs[product]}/>
				: <div>
					<h3>Seleccione una categoría de producto para administrarlo</h3>
					<button type="button" id="equiposAuxiliares" onClick={() => handleSetProduct("equiposAuxiliares")}>Equipos auxiliares</button>
					<button type="button" id="columnas" onClick={() => handleSetProduct("columnas")}>Columnas</button>
					<button type="button" id="luminarias" onClick={() => handleSetProduct("luminarias")}>Luminarias</button>
				</div>
				}
				<br />
				<Link to="/">Inicio</Link>
			</div>
		</>
	);
}
