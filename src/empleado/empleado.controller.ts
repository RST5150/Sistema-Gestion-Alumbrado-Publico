import { Request, Response, NextFunction} from "express";
import { Empleado } from "./empleado.entity.js";
import { validarEmpleado, validarEmpleadoOpcional } from "./empleados.schema.js";
import { orm } from "../shared/db/orm.js";

const ERR_500 = "Oops! Something went wrong. This is our fault."

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const empleados = await em.find(Empleado, {})
        res.json({date: empleados})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const empleado = await em.findOneOrFail(Empleado, {id: res.locals.id})
        res.json({data: empleado})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function add(req: Request, res: Response) {
    try{
        const empleado = await em.create(Empleado, res.locals.empleadoNuevo)
        await em.flush()
        res.status(201).json({message: "Empleado creado", data: empleado})
} catch (err) {
    handleOrmError(res, err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const empleado = await em.findOneOrFail(Empleado, {id: res.locals.id})
        em.assign(empleado, res.locals.empleadoParcial)
        await em.flush()
        res.json({message: "Empleado actualizado", data: empleado})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const empleado = await em.findOneOrFail(Empleado, {id: res.locals.id})
        const empleadoRef = em.getReference(Empleado, res.locals.id)
        await em.removeAndFlush(empleadoRef)

        res.json({message: "Empleado eliminado", data: empleado})
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

export { findAll, findOne, add, update, remove, validateExists, sanitizeInput, sanitizePartialInput }