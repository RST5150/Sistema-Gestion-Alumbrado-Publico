import { Request, Response, NextFunction} from "express";
import { Empleado } from "./empleado.entity.js";
import { validarEmpleado, validarEmpleadoOpcional } from "./empleados.schema.js";
import { orm } from "../shared/db/orm.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ERR_500 = "Oops! Something went wrong. This is our fault."

const em = orm.em
const apiSecret = process.env.apiSecret

async function findAll(req: Request, res: Response) {
    try {
        const empleados = await em.find(Empleado, {})
        empleados.map(e => { if (e.clave) e.clave = "*" } )
        res.json({data: empleados})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const empleado = await em.findOneOrFail(Empleado, {id: res.locals.id})
        const { clave, ...restEmpleado } = empleado
        res.json({data: restEmpleado})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function login(req: Request, res: Response) {
    try {
        const { dni, clave } = res.locals.empleadoParcial;
		if (!dni || !clave) {
            return res.status(400).json({"message": "Falta DNI o clave"});
		}
        const empleado = await em.findOne(Empleado, {dni: dni})
        if (!empleado) {
			return res.status(404).json({"message": "DNI o clave incorrectos"});
		}
        if (!empleado.clave) {
			return res.status(400).json({"message": "No posee clave activa"});
		}
		const isCorrect = await bcrypt.compare(clave, empleado.clave);
		if (!isCorrect) {
			return res.status(404).json({"message": "DNI o clave incorrectos"});
		}
		if (!apiSecret) {
			throw new Error("api secret no definido");
		}
		const token = jwt.sign({dni: empleado.dni}, apiSecret, {expiresIn: "1h"});
		return res.status(201).json({token, "empleado": empleado.dni, "rol": empleado.rol});
	} catch (err) {
		console.error("Error al iniciar sesión", err);
		res.status(500).json({"message": "Error al iniciar sesión"});
	}
}

async function signup(req: Request, res: Response) {
    try {
        const { dni, clave } = res.locals.empleadoParcial;
        if (!dni || !clave) {
            return res.status(400).json({"message": "falta DNI o clave"});
		}
        const empleado = await em.findOne(Empleado, {dni: dni});
        if (!empleado) {
			return res.status(404).json({"message": "no se encontró el empleado"});
		}
        if (empleado.clave) {
			return res.status(409).json({"message": "ya posee clave el empleado"});
		}
		const hash = await bcrypt.hash(clave, 10);
        res.locals.empleadoParcial.clave = hash;
        em.assign(empleado, res.locals.empleadoParcial);
        await em.flush();
		return res.status(200).json({message: "Cuenta de empleado creada", dni: empleado.dni});
	} catch (err) {
		console.error("Error al guardar user en la BD", err);
		res.status(500).json({"message": "Error al registrar el usuario"});
	}
}
async function add(req: Request, res: Response) {
    try {
        const duplicated = await em.findOne(Empleado, {dni: res.locals.empleadoNuevo.dni})
        if (duplicated) {
            return res.status(400).json({message: "Ya existe un empleado con ese DNI"})
        }
        const empleado = em.create(Empleado, res.locals.empleadoNuevo)
        await em.flush()
        res.status(201).json({message: "Empleado creado", data: empleado})
} catch (err) {
    handleOrmError(res, err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const empleado = await em.findOneOrFail(Empleado, {id: res.locals.id})
        if (res.locals.empleadoParcial.clave) {
            const hash = await bcrypt.hash(res.locals.empleadoParcial.clave, 10);
            res.locals.empleadoParcial.clave = hash;
        }
        em.assign(empleado, res.locals.empleadoParcial)
        await em.flush()
        const { clave, ...restEmpleado } = empleado
        res.json({message: "Empleado actualizado", data: restEmpleado})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const empleado = await em.findOneOrFail(Empleado, {id: res.locals.id})
        const empleadoRef = em.getReference(Empleado, res.locals.id)
        await em.removeAndFlush(empleadoRef)
        const { clave, ...restEmpleado } = empleado
        res.json({message: "Empleado eliminado", data: restEmpleado})
    }   catch (err) {
        handleOrmError(res, err)
    }
}

//middleware

function validateExists(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id))
        return res.status(400).json({message: "El ID debe ser un número entero"})

    res.locals.id = id

    next();
}

async function sanitizeInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarEmpleado(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const empleadoNuevo = incoming.output

    res.locals.empleadoNuevo = empleadoNuevo

    const sanitizedInput = res.locals.empleadoNuevo

    Object.keys(sanitizedInput).forEach(key => {
        if (sanitizedInput[key] === undefined) {
            delete sanitizedInput[key]
        }
    });

    next()
}

async function sanitizePartialInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarEmpleadoOpcional(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const empleadoParcial = incoming.output
    
    res.locals.empleadoParcial = empleadoParcial

    const sanitizedInput = res.locals.empleadoParcial

    Object.keys(sanitizedInput).forEach(key => {
        if (sanitizedInput[key] === undefined) {
            delete sanitizedInput[key]
        }
    });
    res.locals.empleadoParcial = sanitizedInput

    next()

}

    function handleOrmError(res: Response, err: any) {
        if (err.code) {
          switch (err.code) {
            case "ER_DUP_ENTRY":
              // Ocurre cuando el usuario quiere crear un objeto con un atributo duplicado en una tabla marcada como Unique
              res.status(400).json({message: `Hay entradas duplicadas que deberian ser unicas`})
              break
            case "ER_DATA_TOO_LONG":
              res.status(400).json({message: `Datos muy largos.`})
              break
          }
        }
        else {
          switch (err.name) {
            case "NotFoundError":
              res.status(404).json({message: `Columna no encontrada para ese ID ${res.locals.id}`})
              break
            default:
              console.error("\n--- ORM ERROR ---")
              console.error(err.message)
              res.status(500).json({message: "Tuki'nt."})
              break
          }
        }
      }

    
    function throw500(res: Response, err: any) {
       res.status(500).json({ message: ERR_500 })
     }

export { findAll, findOne, add, update, remove, validateExists, sanitizeInput, sanitizePartialInput, login, signup }
