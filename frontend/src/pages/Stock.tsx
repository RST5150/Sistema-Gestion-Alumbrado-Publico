import { useState } from "react";
import { Link } from "react-router";
import Filters from "../components/Filters";

export default function Stock() {

	const [ product, setProduct ] = useState("");

	const productSpecs: { [key: string]: { displayName: string, filters: Object, headers: Array<string>, dataKeys: Array<string>, discreteValues: {[key: string]: string[] } | null }} = {
		columnas: {
			displayName: "columnas",
			filters: {
				material: "Material",
				fechaAdquisicionDesde: "Fecha de adquisición (desde)",
				fechaAdquisicionHasta: "Fecha de adquisición (hasta)"
			},
			headers: ["ID", "Nro de serie", "Material", "Fecha de adquisición", "Fecha de instalación", "Opciones"],
			dataKeys: ["id", "nroSerie", "material", "fechaAdquisicion", "fechaInstalacion"],
			discreteValues: null
		},
		equiposAuxiliares: {
			displayName: "equipos auxiliares",
			filters: {
				marca: "Marca",
				tipo: "Tipo",
				fechaAdquisicionDesde: "Fecha de adquisición (desde)",
				fechaAdquisicionHasta: "Fecha de adquisición (hasta)"
			},
			headers: ["ID", "Nro de serie", "Marca", "Tipo", "Fecha de adquisición", "Fecha de instalación", "Opciones"],
			dataKeys: ["id", "nroSerie", "marca", "tipo", "fechaAdquisicion", "fechaInstalacion"],
			discreteValues: {
				tipo: ["Driver", "Balastro"]
			}
		},
		luminarias: {
			displayName: "luminarias",
			filters: {
				marca: "Marca",
				tecnologia: "Tecnología",
				potencia: "Potencia",
				fechaAdquisicionDesde: "Fecha de adquisición (desde)",
				fechaAdquisicionHasta: "Fecha de adquisición (hasta)",
			},
			headers: ["ID", "Nro de serie", "Marca", "Tecnología", "Potencia", "Fecha de adquisición", "Fecha de instalación", "Opciones"],
			dataKeys: ["id", "nroSerie", "marca", "tecnologia", "potencia", "fechaAdquisicion", "fechaInstalación"],
			discreteValues: {
				tecnologia: ["LED", "Sodio", "Mercurio"]
			}
		},
		servicios: {
			displayName: "servicios",
			filters: {},
			headers: [],
			dataKeys: [],
			discreteValues: null
		}
	};

	function handleSetProduct(p: string) {
		setProduct(p);
	}

	return (
		<>
			<div>
				<h1>Sistema de Gestión de alumbrado público</h1>
				<h2>Stock {product ? "de " + productSpecs[product].displayName : ""}</h2>
				<p>Acá va algo de descripción</p>
				{product ? 
					<Filters product={product} handleProduct={handleSetProduct} specs={productSpecs[product]}></Filters>
				: <div>
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
