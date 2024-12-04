import * as v from 'valibot'
import { Tipo } from './equipoAuxiliar.entity.js'
const NRO_SERIE_MIN = 10
const NRO_SERIE_MAX = 20
const TIPO = Tipo
const [FECHA_MIN, FECHA_MAX] = [new Date(1970, 1, 1).toISOString(), new Date().toISOString()]
const ERR_NRO_SERIE_MIN = `El número de serie debe tener como mínimo ${NRO_SERIE_MIN} caracteres`
const ERR_NRO_SERIE_MAX = `El número de serie debe tener como máximo ${NRO_SERIE_MAX} caracteres`
const ERR_MARCA = `La marca debe ser una cadena de texto`
const ERR_TIPO = `El tipo debe ser uno de ${Object.values(TIPO).join(', ')}`
const ERR_FECHA = `La fecha debe estar entre ${FECHA_MIN} y ${FECHA_MAX}`
const ERR_ID = `Es necesario un id`

const id = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const nroSerie = v.pipe(
    v.string(),
    v.minLength(NRO_SERIE_MIN, ERR_NRO_SERIE_MIN),
    v.maxLength(NRO_SERIE_MAX, ERR_NRO_SERIE_MAX),
)

const marca = v.string(ERR_MARCA)

const tipo = v.pipe(
    v.string(ERR_TIPO),
    v.enum(TIPO, ERR_TIPO),
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

export const equipoAuxiliarSchema = v.object({
    nroSerie: nroSerie,
    marca: marca,
    tipo: tipo,
    fechaAdquisicion: fechaAdquisicion,
    fechaInstalacion: v.optional(fechaInstalacion),
})

export const equipoAuxiliarOpcional = v.partial(equipoAuxiliarSchema)

export const validarEquipoAuxiliar = v.safeParserAsync(equipoAuxiliarSchema)
export const validarEquipoAuxiliarOpcional = v.safeParserAsync(equipoAuxiliarOpcional)