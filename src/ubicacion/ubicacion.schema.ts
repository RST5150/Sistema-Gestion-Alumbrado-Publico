import * as v from 'valibot'
import { Distrito } from './ubicacion.entity.js'

const ERR_ID = `Es necesario un id 32`
const ERR_ID_CALLE = `Es necesario un nombre de calle`
const ERR_ID_ALTURA = `Es necesario una altura`
const ERR_ID_LATITUD = `Es necesario una latitud válida`
const ERR_ID_LONGITUD = `Es necesario una longitud válida`
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
    v.number(ERR_ID_LATITUD),
    v.minValue(-90, ERR_ID_LATITUD),
    v.maxValue(90, ERR_ID_LATITUD),
)

const longitud = v.pipe(
    v.number(ERR_ID_LONGITUD),
    v.minValue(-180, ERR_ID_LONGITUD),
    v.maxValue(180, ERR_ID_LONGITUD),
)

const distrito = v.pipe(
    v.string(),
    v.enum(Dis, ERR_ID_DISTRITO),
)

export const ubicacionSchema = v.object({
    id: id,
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
