import * as v from 'valibot'
import { Material } from '../columna/columna.entity.js'

const NRO_SERIE_MIN = 10
const NRO_SERIE_MAX = 20
const Mat = Material
const [FECHA_MIN, FECHA_MAX] = [new Date(1970, 1, 1).toISOString(), new Date().toISOString()]
const ERR_NRO_SERIE_MIN = `El número de serie debe tener como mínimo ${NRO_SERIE_MIN} caracteres`
const ERR_NRO_SERIE_MAX = `El número de serie debe tener como máximo ${NRO_SERIE_MAX} caracteres`
const ERR_MATERIAL = `El material debe ser uno de ${Object.values(Mat).join(', ')}`
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

const material = v.pipe(
    v.string(ERR_MATERIAL),
    v.enum(Mat, ERR_MATERIAL),
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

export const columnaSchema = v.object({
    nroSerie: nroSerie,
    material: material,
    fechaAdquisicion: fechaAdquisicion,
    fechaInstalacion: v.optional(fechaInstalacion),
    idServicio: v.optional(id),
 })

export const columnaOpcional = v.partial(columnaSchema)

export const validarColumna = v.safeParserAsync(columnaSchema)
export const validarColumnaOpcional = v.safeParserAsync(columnaOpcional)