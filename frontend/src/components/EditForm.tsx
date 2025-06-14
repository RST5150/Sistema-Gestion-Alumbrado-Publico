import { use } from "react";
import { useParams } from "react-router";
import { baseDir, domain, productSpecs } from "../utils/config";
import { formatDateSave } from "../utils/functions";
import useAuth from "../hooks/useAuth";

export default function EditForm({ dataa, setStatus, setMessage }: { dataa: Promise<{ data: { [key: string]: any }; message: string }> | null, setStatus: Function, setMessage: Function }) {

	const { product, id } = useParams();
	const { token } = useAuth();

	let dataU;
	if (dataa == null) {
		dataU = null;
	} else {
		dataU = use(dataa);
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = `${domain}${baseDir}/${product}/${id}`;
		const formData = new FormData(e.currentTarget);
		if (!formData.get("fechaRemocion")) formData.delete("fechaRemocion");
		if (!formData.get("fechaInstalacion")) formData.delete("fechaInstalacion");
		const jsonData = Object.fromEntries(formData.entries());
		try {
			const res = await fetch(url, {
				method: "PATCH",
				body: JSON.stringify(jsonData),
				headers: {
					"Content-Type": "application/json",
					"Authorization": token
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
			console.error("Error enviando el formulario:", error);
			setStatus(500);
			throw error;
		}
	};

	return (
		<>
		{dataU !== undefined && dataU !== null && Object.keys(dataU.data).length ? (
			<form onSubmit={handleSubmit}>
				{product !== undefined && Object.entries(dataU.data).map(([key, value]) => (
					productSpecs[product]["manage"][key] && (
						<div key={key}>
							<label>{productSpecs[product]["manage"][key]} &nbsp;
								{Array.isArray(value) ? (
									value.map((item, index) => (
										<input key={index} type="text" name={`${key}[]`} defaultValue={item.toString()} />
									))
								) : key.includes("fecha") ? (
									<input type="date" name={key} defaultValue={value !== null ? formatDateSave(value.toString()) : undefined} />
								) : productSpecs[product].discreteValues && productSpecs[product].discreteValues[key] ? (
									<select name={key} id={key} defaultValue={value}>
										<option value="" disabled>Seleccione</option>
										{productSpecs[product].discreteValues[key].map((v: string) => (
											<option key={v} value={v}>{v}</option>
										))}
									</select>
								) : value === null ? (
									<span> Ninguno</span>
								) : (
									<input type="text" name={key} defaultValue={value.toString()} readOnly={key === 'id'} />
								)}
							</label>
						</div>
					)
				))}
				<button type="submit">Enviar</button>
			</form>
		) : (
			<div>
				<p>No se encontró el elemento requerido.</p>
			</div>
		)}
		</>
	);
}
