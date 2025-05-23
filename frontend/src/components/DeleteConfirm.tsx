import { use, useState } from "react";
import { useParams } from "react-router";
import { baseDir, domain, productSpecs } from "../utils/config";
import { formatDateShow } from "../utils/functions";

export default function DeleteConfirm({ dataa, setStatus, setMessage }: { dataa: Promise<{ data: { [key: string]: any }; message: string }> | null, setStatus: Function, setMessage: Function }) {

	const [ isConfirmedDelete, setConfirmedDelete ] = useState(false);
	const { product, id } = useParams();

	let dataU;
	if (dataa == null) {
		dataU = null;
	} else {
		dataU = use(dataa);
	}

	const handleDelete = async () => {
		const url = `${domain}${baseDir}/${product}/${id}`;
		try {
			const res = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				}
			});
			if (!res.ok) {
				setStatus(res.status);
			}
			setStatus(res.status);
			const dataJson = await res.json();
			setMessage(dataJson.message);
			return dataJson;
		} catch (error) {
			console.error("Error eliminando el elemento:", error);
			setStatus(500);
			throw error;
		}
	};

	return (
		<>
		{dataU !== undefined && dataU !== null && Object.keys(dataU.data).length ? (
			<div>
				{ product !== undefined && Object.entries(dataU.data).map(([key, value]) => (
					productSpecs[product]["manage"][key] && (
						<div key={key}>
							<p>{ productSpecs[product]["manage"][key] }: &nbsp;
								{ Array.isArray(value) ? (
									value.map((item, index) => (
										<span key={index} id={`${key}[]`}>{item.toString()}</span>
									))
								) : key.includes("fecha") ? (
									<span id={key}>{value !== null ? formatDateShow(value.toString()) : "No establecida"}</span>
								) : value === null ? (
									<span> Ninguno</span>
								) : (
									<span id={key}>{value.toString()}</span>
								)}
							</p>
						</div>
					)
				))}
				{ product !== undefined && isConfirmedDelete ? (
					<div>
						<p>¿Está seguro que desea eliminar { product === "columnas" || product === "luminarias" ? "la " : "el " }
							{ productSpecs[product].displayNameSingular }?
						</p>
						<button type="button" onClick={ handleDelete }>Confirmar eliminación</button>
					</div>
				) : (
					<button type="button" onClick={ () => setConfirmedDelete(true) }>Eliminar</button>
				)}
			</div>
		) : (
			<div>
				<p>No se encontró el elemento requerido.</p>
			</div>
		)}
		</>
	);
}
