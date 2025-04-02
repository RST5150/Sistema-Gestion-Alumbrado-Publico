import * as v from "valibot";
import { Estado, Tipo, Falla } from "./mantenimiento.entity.js";

const ERR_ID = `Es necesario un id`;
const ERR_ID_EMPLEADO = `Es necesario un id de empleado`;
const ERR_ID_SERVICIO = `Es necesario un id de servicio`;
const ERR_ID_TAREA = `Es necesario un id de tarea`;
const ERR_ID_LUMINARIA = `Es necesario al menos un id de luminaria`;
const ERR_ID_EQUIPO_AUX = `Es necesario al menos un id de equipo auxiliar`;
const Est = Estado;
const ERR_ESTADO = `El estado debe ser Pendiente o Realizado`;
const Tip = Tipo;
const ERR_TIPO = `El tipo debe ser Rutinario o Prioritario`;
const ERR_VALOR_PAT = `El valor PAT debe ser un número`;
const fal = Falla;
const ERR_FALLA = `La falla debe ser Luminaria, Equipo Auxiliar, Ambos o Ninguno`;
const ERR_FECHA = `La fecha debe ser una fecha válida`;
const ARRAY_ERROR = `Si ves esto, no estas enviando un array con los datos adecuados pa`;

const id = v.pipe(v.number(ERR_ID), v.integer(ERR_ID));

const fechaAlta = v.pipe(v.string(), v.isoDate(ERR_FECHA));

const estado = v.pipe(v.string(), v.enum(Est, ERR_ESTADO));

const tipo = v.pipe(v.string(), v.enum(Tip, ERR_TIPO));

const fechaRealizacion = v.optional(v.pipe(v.string(), v.isoDate(ERR_FECHA)));

const valorPAT = v.pipe(
  v.string(ERR_VALOR_PAT),
  v.regex(/^-?\d+(\.\d+)?$/, ERR_VALOR_PAT), // Verifica formato numérico (entero o decimal)
  v.transform((value: string) => parseFloat(value))
);

const falla = v.optional(v.pipe(v.string(), v.enum(fal, ERR_FALLA)));

const observaciones = v.optional(v.string());

const servicio = v.pipe(v.number(ERR_ID_SERVICIO), v.integer(ERR_ID_SERVICIO));

const tarea = v.pipe(v.number(ERR_ID_TAREA), v.integer(ERR_ID_TAREA));

const empleado = v.pipe(v.number(ERR_ID_EMPLEADO), v.integer(ERR_ID_EMPLEADO));

const luminaria = v.pipe(
  v.array(v.string(ARRAY_ERROR)), //Tenemos que pasar los nro de serie de las luminarias y equipo auxiliar porque es lo que se ve
  v.minLength(1, ERR_ID_LUMINARIA)
);

const equipoAux = v.pipe(
  v.array(v.string(ARRAY_ERROR)),
  v.minLength(1, ERR_ID_EQUIPO_AUX)
);

export const mantenimientoSchema = v.object({
  fechaAlta: fechaAlta,
  estado: estado,
  tipo: tipo,
  fechaRealizacion: v.optional(fechaRealizacion),
  valorPAT: valorPAT,
  falla: v.optional(falla),
  observaciones: observaciones,
  servicio: servicio,
  tareas: v.optional(v.array(tarea)),
  empleado: empleado,
  luminarias: v.optional(luminaria),
  equiposAux: v.optional(equipoAux),
});

export const mantenimientoOpcional = v.partial(mantenimientoSchema);

export const validarMantenimiento = v.safeParserAsync(mantenimientoSchema);
export const validarMantenimientoOpcional = v.safeParserAsync(
  mantenimientoOpcional
);
