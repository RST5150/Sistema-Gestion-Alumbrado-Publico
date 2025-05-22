import { use } from "react";
import { Link } from "react-router";
import { formatDateShow } from "../utils/functions";

export default function Table({ dataa, specs, referrer }: { dataa: Promise<{data: {id: Number, [key: string]: any}}>, specs: { filters: Record<string, any>, [key: string]: any, displayName: string, headers: {[key: string]: string[] }, dataKeys: {[key: string]: string[] } }, referrer: string}) {

	const dataU = use(dataa);

	function Thead({ headers }: {headers: string[]}) {
		return (
			<thead>
				<tr>
					{headers.map((h, index) => <th key={index}>{h}</th>)}
				</tr>
			</thead>
		);
	}

	return (
		<>
		{dataU.data && Object.keys(dataU.data).length ? (
			<table>
				<Thead headers={Object.values(specs[referrer])}/>
				<tbody>
					{dataU.data.map((d: { [key: string]: any}) =>
						<tr key={d.id}>
							{Object.keys(d).map(key => (
								Object.keys(specs[referrer]).includes(key) && 
									<td key={key}>{key.includes("fecha") && d[key] !== null ? formatDateShow(d[key]) : d[key]}</td>
							))}
							{referrer === "manage" &&
								<td>
									<Link to={`modificar/${specs.productName}/${d.id}`}>Modificar</Link>
									&nbsp;
									<Link to={`eliminar/${specs.productName}/${d.id}`}>Eliminar</Link>
								</td>
							}
						</tr>
					)}
				</tbody>
			</table>
		) : (
			<div>
				<p>No se encontró ningún resultado con esos parámetros de búsqueda.</p>
			</div>
		)}
		</>
	);
}
