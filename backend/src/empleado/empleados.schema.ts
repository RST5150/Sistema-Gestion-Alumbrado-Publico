import * as v from 'valibot'
import { Rol } from '../empleado/empleado.entity.js'

const DNI_LENGHT = 8
const APP_NOM_MIN = 3
const APP_NOM_MAX = 20
const EMAIL_MIN = 5
const EMAIL_MAX = 40
const TEL_MIN = 5
const TEL_MAX = 20
const ROL = Rol
const ERR_ID = `Es necesario un id`
const ERR_DNI = `El dni debe tener ${DNI_LENGHT} caracteres`
const ERR_APP_NOM_MIN = `El apellido y nombre deben tener como mínimo ${APP_NOM_MIN} caracteres`
const ERR_APP_NOM_MAX = `El apellido y nombre deben tener como máximo ${APP_NOM_MAX} caracteres`
const ERR_EMAIL = `El email debe tener un formato válido`
const ERR_EMAIL_REQ = `El email es requerido`
const ERR_EMAIL_MIN = `El email debe tener como mínimo ${EMAIL_MIN} caracteres`
const ERR_EMAIL_MAX = `El email debe tener como máximo ${EMAIL_MAX} caracteres`
const ERR_TEL_MIN = `El teléfono debe tener como mínimo ${TEL_MIN} caracteres`
const ERR_TEL_MAX = `El teléfono debe tener como máximo ${TEL_MAX} caracteres`
const ERR_ROL = `El rol debe ser uno de ${Object.values(ROL).join(', ')}`
const ERR_FECHA = `La fecha debe ser una fecha válida`

const id = v.pipe(
    v.number(ERR_ID),
    v.integer(ERR_ID),
)
const dni = v.pipe(
    v.string(),
    v.minLength(DNI_LENGHT, ERR_DNI),
    v.maxLength(DNI_LENGHT, ERR_DNI),
)

const apellido = v.pipe(
    v.string(ERR_APP_NOM_MIN),
    v.minLength(APP_NOM_MIN, ERR_APP_NOM_MIN),
    v.maxLength(APP_NOM_MAX, ERR_APP_NOM_MAX),
)

const nombre = v.pipe(
    v.string(ERR_APP_NOM_MIN),
    v.minLength(APP_NOM_MIN, ERR_APP_NOM_MIN),
    v.maxLength(APP_NOM_MAX, ERR_APP_NOM_MAX),
)

const email = v.pipe(
    v.string(),
    v.email(ERR_EMAIL),
    v.minLength(EMAIL_MIN, ERR_EMAIL_MIN),
    v.maxLength(EMAIL_MAX, ERR_EMAIL_MAX),
  );

const telefono = v.pipe(
    v.string(),
    v.minLength(TEL_MIN, ERR_TEL_MIN),
    v.maxLength(TEL_MAX, ERR_TEL_MAX),
)

const fechaIngreso = v.pipe(
    v.string(),
    v.isoDate(ERR_FECHA),
)

const rol = v.pipe(
    v.string(ERR_ROL),
    v.enum(ROL, ERR_ROL),
)

export const empleadoSchema = v.object({
    dni: dni,
    apellido: apellido,
    nombre: nombre,
    email: v.optional(email),
    telefono: v.optional(telefono),
    fechaIngreso: fechaIngreso,
    rol: rol,
})

export const empleadoOpcional = v.partial(empleadoSchema)

export const validarEmpleado = v.safeParserAsync(empleadoSchema)
export const validarEmpleadoOpcional = v.safeParserAsync(empleadoOpcional)