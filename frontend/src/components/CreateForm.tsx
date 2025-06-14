import { useParams } from "react-router";
import { baseDir, domain, productSpecs } from "../utils/config";
import useAuth from "../hooks/useAuth";

export default function CreateForm({ setStatus, setMessage }: { setStatus: Function, setMessage: Function }) {

	const { product } = useParams();
	const { token } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = `${domain}${baseDir}/${product}`;
		const formData = new FormData(e.currentTarget);
		if (!formData.get("fechaRemocion")) formData.delete("fechaRemocion");
		if (!formData.get("fechaInstalacion")) formData.delete("fechaInstalacion");
		const jsonData = Object.fromEntries(formData.entries());
		try {
			const res = await fetch(url, {
				method: "POST",
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
		<form onSubmit={handleSubmit}>
			{product !== undefined && Object.entries(productSpecs[product]["manage"]).map(([key, value]) => (
				<div key={key}>
				{ key !== "id" && key !== "opciones" && 
					<label>{value} &nbsp;
						{ key.includes("fecha") ? (
							<input type="date" name={key} />
						) : productSpecs[product].discreteValues && productSpecs[product].discreteValues[key] ? (
							<select name={key} id={key} defaultValue="">
								<option value="" disabled>Seleccione</option>
								{productSpecs[product].discreteValues[key].map((v: string) => (
									<option key={v} value={v}>{v}</option>
								))}
							</select>
						) : (
							<input type="text" name={key} id={key} />
						)}
					</label>
				}
				</div>
			))}
			<button type="submit">Crear</button>
		</form>
	);
}
