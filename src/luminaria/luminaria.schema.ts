import * as v from 'valibot'
import { Tecnologia } from './luminaria.entity.js'

const NRO_SERIE_MIN = 10
const NRO_SERIE_MAX = 20
const TECNOLOGIA = Tecnologia
const POTENCIA_MIN = 250
const [FECHA_MIN, FECHA_MAX] = [new Date(1970, 1, 1).toISOString(), new Date().toISOString()]
const ERR_NRO_SERIE_MIN = `El número de serie debe tener como mínimo ${NRO_SERIE_MIN} caracteres`
const ERR_NRO_SERIE_MAX = `El número de serie debe tener como máximo ${NRO_SERIE_MAX} caracteres`
const ERR_TECNOLOGIA = `La tecnología debe ser una de ${Object.values(TECNOLOGIA).join(', ')}`
const ERR_FECHA = `La fecha debe estar entre ${FECHA_MIN} y ${FECHA_MAX}`
const ERR_ID = `Es necesario un id`
const ERR_POTENCIA = `La potencia debe ser mayor a ${POTENCIA_MIN}`
const ERR_POTENCIA_MULTIPLE = `La potencia debe ser un múltiplo de 50`
const MULTIPLO50 = (value: unknown): value is number => typeof value === 'number' && value % 50 === 0

const POTENCIAMULTIPLE = v.pipe(
    v.number(),
    v.integer(),
    v.minValue(POTENCIA_MIN, ERR_POTENCIA),
    v.custom(MULTIPLO50, ERR_POTENCIA_MULTIPLE),
)

const id = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const nroSerie = v.pipe(
    v.string(),
    v.minLength(NRO_SERIE_MIN, ERR_NRO_SERIE_MIN),
    v.maxLength(NRO_SERIE_MAX, ERR_NRO_SERIE_MAX),
)

const tecnologia = v.pipe(
    v.string(ERR_TECNOLOGIA),
    v.enum(TECNOLOGIA, ERR_TECNOLOGIA),
)

const potencia = v.pipe(
    v.number(),
    v.integer(),
   // v.minValue(POTENCIA_MIN, ERR_POTENCIA),
    //v.custom(MULTIPLO50, ERR_POTENCIA_MULTIPLE),
)

const fechaAdquisicion = v.pipe(
    v.string(),
    v.isoDate(ERR_FECHA),
    v.minValue(FECHA_MIN, ERR_FECHA),
    v.maxValue(FECHA_MAX, ERR_FECHA),
)

const fechaInstalacion = v.pipe(
    v.string(),
    v.isoDate(ERR_FECHA),
    v.minValue(FECHA_MIN, ERR_FECHA),
    v.maxValue(FECHA_MAX, ERR_FECHA),
)

export const luminariaSchema = v.object({
    nroSerie: nroSerie,
    marca: v.string(),
    tecnologia: tecnologia,
    potencia: potencia,
    fechaAdquisicion: fechaAdquisicion,
    fechaInstalacion: v.optional(fechaInstalacion),
    idServicio: v.optional(id),
    idMantenimiento: v.optional(id),
})

export const luminariaOpcional = v.partial(luminariaSchema)

export const validarLuminaria = v.safeParserAsync(luminariaSchema)
export const validarLuminariaOpcional = v.safeParserAsync(luminariaOpcional)