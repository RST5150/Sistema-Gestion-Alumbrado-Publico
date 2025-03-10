import * as v from 'valibot'
import { Distrito } from './ubicacion.entity.js'

const ERR_ID = `Es necesario un id`
const ERR_ID_CALLE = `Es necesario un nombre de calle`
const ERR_ID_ALTURA = `Es necesario una altura`
const ERR_LAT_MIN = 'La latitud debe ser mayor a -90'
const ERR_LAT_MAX = 'La latitud debe ser menor a 90'
const ERR_LON_MIN = 'La longitud debe ser menor a -180'
const ERR_LON_MAX = 'La longitud debe ser mayor a 180'
const Dis = Distrito
const ERR_ID_DISTRITO = `Es necesario un distrito`


const id = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const calle = v.pipe(
    v.string(),
    v.minLength(1, ERR_ID_CALLE),
)

const altura = v.pipe(
    v.string(),
    v.minLength(1, ERR_ID_ALTURA),
)
    
const latitud = v.pipe(
    v.string('Por acá no deberia pasar'),
    v.transform((value) => parseFloat(value)),
    v.minValue(-90, ERR_LAT_MIN),
    v.maxValue(90, ERR_LAT_MAX),
)

const longitud = v.pipe(
    v.string('Por acá no deberia pasar'),
    v.transform((value) => parseFloat(value)),
    v.minValue(-180, ERR_LON_MIN),
    v.maxValue(180, ERR_LON_MAX),
)

const distrito = v.pipe(
    v.string(),
    v.enum(Dis, ERR_ID_DISTRITO),
)

export const ubicacionSchema = v.object({
    calle: calle,
    altura: altura,
    bis: v.optional(v.boolean()),
    latitud: latitud,
    longitud: longitud,
    distrito: distrito,
})

export const ubicacionOpcional = v.partial(ubicacionSchema)

export const validarUbicacion = v.safeParserAsync(ubicacionSchema)
export const validarUbicacionOpcional = v.safeParserAsync(ubicacionOpcional)
