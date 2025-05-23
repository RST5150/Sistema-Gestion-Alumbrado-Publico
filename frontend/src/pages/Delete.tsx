import { Suspense, useState } from "react";
import { Link, useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { domain, baseDir, productSpecs } from "../utils/config";
import DeleteConfirm from "../components/DeleteConfirm";

export default function Delete() {

	const [ error, setError ] = useState(false);
	const [ status, setStatus ] = useState(0);
	const [ message, setMessage ] = useState("");
	const { product, id } = useParams();

	async function fetchData(): Promise<{data: {[key: string]: any}, message: string}> {
		
		const url = `${domain}${baseDir}/${product}/${id}`;
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`Error HTTP, estado: ${res.status}`);
			}
			return await res.json();
		} catch (error) {
			console.error("Fallo al obtener los datos:", error);
			setError(true);
			throw error;
		}
	}

	return (
		<>
			<div>
				{ product !== undefined ? (
					<h3>Eliminar 
						{ product === "luminarias" || product === "columnas" ? " una " : " un "}
						{ productSpecs[product].displayNameSingular }
					</h3>
				) : (
					<h3>Eliminar un elemento</h3>
				)}
				{ error ? (
					<h4>No se obtuvo ningún dato</h4>
				) : status == 0 && (
					<ErrorBoundary fallback={<p>No se pudo obtener ningún dato</p>}>
						<Suspense fallback = {<div>Cargando...</div>}>
							<DeleteConfirm dataa={fetchData()} setStatus={setStatus} setMessage={setMessage} />
						</Suspense>
					</ErrorBoundary>
				)}
				{ status == 200 ? (
					<p>{message}</p>
				) : status == 400 ? (
					<div>
						<h4>No se pudo realizar la modificación</h4>
						<p>{message}</p>
						<button type="button" onClick={() => setStatus(0)}>Volver</button>
					</div>
				) : status == 404 ? (
					<div>
						<h4>No se encontró tal producto</h4>
						<p>{message}</p>
					</div>
				) : status == 500 && (
					<div>
						<h4>Ocurrió un error inesperado</h4>
						<p>{message}</p>
					</div>
				)}
				<Link to="/administracion">Volver a administración</Link>
				&nbsp;
				<Link to="/">Inicio</Link>
			</div>
		</>
	);
}
