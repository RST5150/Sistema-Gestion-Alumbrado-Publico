import * as v from 'valibot'

const ERR_ID = `Es necesario un id`
const ERR_NOMBRE = `El nombre debe ser un string`
const ERR_NIVEL = `El nivel debe ser un número entero`
const ERR_FRECUENCIA = `La frecuencia de mantenimiento debe ser un número entero`


const id = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)

const nivel = v.pipe(
    v.number(ERR_NIVEL),
    v.integer(ERR_NIVEL),
)

const frecuenciaMantenimiento = v.pipe(
    v.number(ERR_FRECUENCIA),
    v.integer(ERR_FRECUENCIA),
)

export const tareaMantenimientoSchema = v.object({
    nombre: v.string(ERR_NOMBRE),
    nivel: nivel,
    frecuenciaMantenimiento: frecuenciaMantenimiento,
    mantenimiento: v.optional(id),
})

export const tareaOpcional = v.partial(tareaMantenimientoSchema)

export const validarTarea = v.safeParserAsync(tareaMantenimientoSchema)
export const validarTareaOpcional = v.safeParserAsync(tareaOpcional)