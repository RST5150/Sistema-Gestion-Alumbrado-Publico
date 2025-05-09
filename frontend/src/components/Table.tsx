import { use } from "react";

export default function Table({ dataa, specs }: { dataa: Promise<{data: {id: Number, [key: string]: any}}>, specs: { filters: Record<string, any>, displayName: string, headers: string[], dataKeys: string[] }}) {

	const dataU = use(dataa);

	function formatDate(datein: string) {
		const date = new Date(datein);
		const dd = date.getDate().toString().padStart(2, '0');
		const mm = (date.getMonth() + 1).toString().padStart(2, '0');
		const yyyy = date.getFullYear();
		return `${dd}/${mm}/${yyyy}`;
	}

	function Thead({ headers }: {headers: string[]}) {
		return headers.map((h, index) => <th key={index}>{h}</th>);
	}

	return (
		<>
		{dataU.data && Object.keys(dataU.data).length ?
			<table>
				<thead>
					<tr>
						<Thead headers={specs.headers}/>
					</tr>
				</thead>
				<tbody>
					{dataU.data.map((d: { [key: string]: any}) =>
						<tr key={d.id}>
							{Object.keys(d).map(key => <td key={key}>{key.includes("fecha") ? formatDate(d[key]) : specs.dataKeys.includes(key) ? d[key] : ""}</td>)}
						</tr>
					)}
				</tbody>
			</table>
		: <div>
			<p>No se encontró ningún resultado con esos parámetros de búsqueda.</p>
		</div>
		}
		</>
	);
}
