import * as v from 'valibot'
import { Estado, Tipo, Falla } from './mantenimiento.entity.js'

const ERR_ID = `Es necesario un id`
const ERR_ID_LUMINARIA = `Es necesario al menos un id de luminaria`
const ERR_ID_EQUIPO_AUX = `Es necesario al menos un id de equipo auxiliar`
const Est = Estado
const ERR_ESTADO = `El estado debe ser Pendiente o Realizado`
const Tip = Tipo
const ERR_TIPO = `El tipo debe ser Rutinario o Prioritario`
const ERR_VALOR_PAT = `El valor PAT debe ser un número`
const fal = Falla
const ERR_FALLA = `La falla debe ser Luminaria, Equipo Auxiliar, Ambos o Ninguno`
const ERR_FECHA = `La fecha debe ser una fecha válida`
const ARRAY_ERROR = `Si ves esto, no estas enviando un array pa`


const id = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const fechaAlta = v.pipe(
    v.string(),
    v.isoDate(ERR_FECHA),
)

const estado = v.pipe(
    v.string(),
    v.enum(Est, ERR_ESTADO),
)

const tipo = v.pipe(
    v.string(),
    v.enum(Tip, ERR_TIPO),
)

const fechaRealizacion = v.optional(v.pipe(
    v.string(),
    v.isoDate(ERR_FECHA),
))

const valorPAT = v.pipe(
    v.string(ERR_VALOR_PAT),
    v.decimal(ERR_VALOR_PAT),
)

const falla = v.optional(v.pipe(
    v.string(),
    v.enum(fal, ERR_FALLA),
))

const observaciones = v.optional(v.string())

const servicio = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const tarea = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const empleado = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const luminaria = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const equipoAux = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

export const mantenimientoSchema = v.object({
    id: id,
    fechaAlta: fechaAlta,
    estado: estado,
    tipo: tipo,
    fechaRealizacion: v.optional(fechaRealizacion),
    valorPAT: valorPAT,
    falla: v.optional(falla),
    observaciones: observaciones,
    servicio: v.optional(servicio),
    tareas: v.optional(v.array(tarea)),
    empleado: empleado,
    luminarias: v.optional(v.array(luminaria)),
    equiposAux: v.optional(v.array(equipoAux)),
})

export const mantenimientoOpcional = v.partial(mantenimientoSchema)

export const validarMantenimiento = v.safeParserAsync(mantenimientoSchema)
export const validarMantenimientoOpcional = v.safeParserAsync(mantenimientoOpcional)