import * as v from 'valibot'
import { Luminaria } from '../luminaria/luminaria.entity.js'
import { EquipoAux } from '../equipoAuxiliar/equipoAuxiliar.entity.js'

const ERR_ID = `Es necesario un id`
const ERR_ID_LUMINARIA = `Es necesario al menos un id de luminaria`
const ERR_ID_LUMINARIA_MAX = `No se pueden instalar más de 5 luminarias`
const ERR_ID_EQUIPO_AUX = `Es necesario al menos un id de equipo auxiliar`
const ERR_ID_EQUIPO_AUX_MAX = `No se pueden instalar más de 5 equipos auxiliares`
const ERR_ID_COLUMNAS = `Es necesario un id de columna`
const ERR_FECHA = `La fecha debe ser una fecha válida`
const ARRAY_ERROR = `Si ves esto, no estas enviando un array pa`

const id = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const fechaInstalacion = v.pipe(
    v.string(),
    v.isoDate(ERR_FECHA),
)

const luminaria = v.pipe(
    v.array(v.number(ARRAY_ERROR)),
    v.minLength(1, ERR_ID_LUMINARIA),
    v.maxLength(5, ERR_ID_LUMINARIA_MAX),
)

const equipoAux = v.pipe(
    v.array(v.number(ARRAY_ERROR)),
    v.minLength(1, ERR_ID_EQUIPO_AUX),
    v.maxLength(5, ERR_ID_EQUIPO_AUX_MAX),
)

const columna = v.pipe(
    v.number(ERR_ID_COLUMNAS),
    v.integer(ERR_ID_COLUMNAS),
)

export const servicioLuzSchema = v.object({
    fechaInstalacion: fechaInstalacion,
    luminarias: luminaria,   // Ahora coincide con req.body
    equipoAuxiliar: equipoAux,
    columna: v.optional(columna),
    mantenimiento: v.optional(v.array(id)),   // Si envías mantenimientos
});

export const servicioLuzOpcional = v.partial(servicioLuzSchema)

export const validarServicioLuz = v.safeParserAsync(servicioLuzSchema)
export const validarServicioLuzOpcional = v.safeParserAsync(servicioLuzOpcional)