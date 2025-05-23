export const domain = "http://localhost:3000";
export const baseDir = "/api"

export const productSpecs: { [key: string]: { 
		productName: string,
		displayName: string,
		displayNameSingular: string,
		filters: Object,
		headers: { [key: string]: string[] },
		manage: { [key: string]: string },
		stock: { [key: string]: string },
		dataKeys: { [key: string]: string[] },
		discreteValues: { [key: string]: string[] }	
		| null
	}} = {
	columnas: {
		productName: "columnas",
		displayName: "columnas",
		displayNameSingular: "columna",
		filters: {
			material: "Material",
			fechaAdquisicionDesde: "Fecha de adquisición (desde)",
			fechaAdquisicionHasta: "Fecha de adquisición (hasta)"
		},
		manage: {
			id: "ID",
			nroSerie: "Nro de serie",
			material: "Material",
			fechaAdquisicion: "Fecha de adquisición",
			fechaInstalacion: "Fecha de instalación",
			fechaRemocion: "Fecha de remoción",
			opciones: "Opciones"
		},
		stock: {
			id: "ID",
			nroSerie: "Nro de serie",
			material: "Material",
			fechaAdquisicion: "Fecha de adquisición"
		},
		headers: {
			manage: ["ID", "Nro de serie", "Material", "Fecha de adquisición", "Fecha de instalación", "Opciones"],
			stock: ["ID", "Nro de serie", "Material", "Fecha de adquisición"]
		},
		dataKeys: {
			manage: ["id", "nroSerie", "material", "fechaAdquisicion", "fechaInstalacion"],
			stock: ["id", "nroSerie", "material", "fechaAdquisicion"]
		},
		discreteValues: {
			material: ["Acero", "Madera", "Hormigon"]
		}
	},
	equiposAuxiliares: {
		productName: "equiposAuxiliares",
		displayName: "equipos auxiliares",
		displayNameSingular: "equipo auxiliar",
		filters: {
			marca: "Marca",
			tipo: "Tipo",
			fechaAdquisicionDesde: "Fecha de adquisición (desde)",
			fechaAdquisicionHasta: "Fecha de adquisición (hasta)"
		},
		manage: {
			id: "ID",
			nroSerie: "Nro de serie",
			marca: "Marca",
			tipo: "Tipo",
			fechaAdquisicion: "Fecha de adquisición",
			fechaInstalacion: "Fecha de instalación",
			fechaRemocion: "Fecha de remoción",
			opciones: "Opciones"
		},
		stock: {
			id: "ID",
			nroSerie: "Nro de serie",
			marca: "Marca",
			tipo: "Tipo",
			fechaAdquisicion: "Fecha de adquisición"
		},
		headers: {
			manage: ["ID", "Nro de serie", "Marca", "Tipo", "Fecha de adquisición", "Fecha de instalación", "Opciones"],
			stock: ["ID", "Nro de serie", "Marca", "Tipo", "Fecha de adquisición"]
		},
		dataKeys: {
			manage: ["id", "nroSerie", "marca", "tipo", "fechaAdquisicion", "fechaInstalacion"],
			stock: ["id", "nroSerie", "marca", "tipo", "fechaAdquisicion"]
		},
		discreteValues: {
			tipo: ["Driver", "Balastro"]
		}
	},
	luminarias: {
		productName: "luminarias",
		displayName: "luminarias",
		displayNameSingular: "luminaria",
		filters: {
			marca: "Marca",
			tecnologia: "Tecnología",
			potencia: "Potencia",
			fechaAdquisicionDesde: "Fecha de adquisición (desde)",
			fechaAdquisicionHasta: "Fecha de adquisición (hasta)",
		},
		manage: {
			id: "ID",
			nroSerie: "Nro de serie",
			marca: "Marca",
			tecnologia: "Tecnología", 
			potencia: "Potencia",
			fechaAdquisicion: "Fecha de adquisición",
			fechaInstalacion: "Fecha de instalación",
			fechaRemocion: "Fecha de remoción",
			opciones: "Opciones"
		},
		stock: {
			id: "ID",
			nroSerie: "Nro de serie",
			marca: "Marca",
			tecnologia: "Tecnología", 
			potencia: "Potencia",
			fechaAdquisicion: "Fecha de adquisición"
		},
		headers: {
			manage: ["ID", "Nro de serie", "Marca", "Tecnología", "Potencia", "Fecha de adquisición", "Fecha de instalación", "Opciones"],
			stock: ["ID", "Nro de serie", "Marca", "Tecnología", "Potencia", "Fecha de adquisición"]
		},
		dataKeys: {
			manage: ["id", "nroSerie", "marca", "tecnologia", "potencia", "fechaAdquisicion", "fechaInstalacion"],
			stock: ["id", "nroSerie", "marca", "tecnologia", "potencia", "fechaAdquisicion"]
		},
		discreteValues: {
			tecnologia: ["LED", "Sodio", "Mercurio"]
		}
	},
	servicios: {
		productName: "servicios",
		displayName: "servicios",
		displayNameSingular: "servicio",
		filters: {},
		manage: {},
		stock: {},
		headers: {},
		dataKeys: {},
		discreteValues: null
	}
};
