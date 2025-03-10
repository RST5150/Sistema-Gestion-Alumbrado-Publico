import { use } from "react";

export default function Table({product, dataa }: {product: string, dataa: Promise<Object>}) {

	const dataU = use(dataa);

	function formatDate(datein: string) {
		const date = new Date(datein);
		const dd = date.getDate().toString().padStart(2, '0');
		const mm = (date.getMonth() + 1).toString().padStart(2, '0');
		const yyyy = date.getFullYear();
		return `${dd}/${mm}/${yyyy}`;
	}

	function Thead(product: string) {
		let headers = [];
		if (product == "equiposAuxiliares") {
			headers = ["ID", "Nro de serie", "Marca", "Tipo", "Fecha de adquisición", "Fecha de instalación", "Opciones"];
		} else if (product == "luminarias") {
			headers = ["ID", "Nro de serie", "Marca", "Tecnología", "Potencia", "Fecha de adquisición", "Fecha de instalación", "Opciones"];
		} else if (product == "columnas") {
			headers = ["ID", "Nro de serie", "Material", "Fecha de adquisición", "Fecha de instalación", "Opciones"];
		} else {
			headers = ["Error al obtener el tipo de producto"];
		}
		return headers.map((h, index) => <th key={index}>{h}</th>);
	}
	return (
		<>
			<table>
				<thead>
					<tr>
						{Thead(product)}
					</tr>
				</thead>
				<tbody>
					{dataU.data.map((d) => <tr key={d.id}>
							{Object.keys(d).map((key) => <td key={key}>{key.includes("fecha") ? formatDate(d[key]) : d[key]}</td>)}
						</tr>
					)
					}
				</tbody>
			</table>
		</>
	);
}
