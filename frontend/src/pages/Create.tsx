import { Suspense, useState } from "react";
import { Link, useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { productSpecs } from "../utils/config";
import CreateForm from "../components/CreateForm";

export default function Create() {

	const [ status, setStatus ] = useState(0);
	const [ message, setMessage ] = useState("");
	const { product } = useParams();

	return (
		<div>
			{ product !== undefined ? (
				<h3>Registrar 
					{ product === "luminarias" || product === "columnas" ? " una " : " un "}
					{ productSpecs[product].displayNameSingular }
				</h3>
			) : (
				<h3>Registrar un elemento</h3>
			)}
			{ status == 0 && (
				<ErrorBoundary fallback={<p>No se pudo obtener ningún dato</p>}>
					<Suspense fallback = {<div>Cargando...</div>}>
						<CreateForm setStatus={setStatus} setMessage={setMessage} />
					</Suspense>
				</ErrorBoundary>
			)}
			{ status == 201 ? (
				<div>
					<h4>Operación realizada con éxito</h4>
					<p>{message}</p>
				</div>
			) : status == 400 ? (
				<div>
					<h4>No se pudo realizar la operación</h4>
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
	);
}
