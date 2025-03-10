import { Request, Response, NextFunction } from "express";
import { Columna } from "./columna.entity.js";
import { validarColumna, validarColumnaOpcional } from "./columna.schema.js";
import { orm } from "../shared/db/orm.js";

const ERR_500 = "Oops! Something went wrong. This is our fault."

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const columnas = await em.find(Columna, {})
        res.json({date: columnas})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const columna = await em.findOneOrFail(Columna, {id: res.locals.id})
        res.json({data: columna})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function add(req: Request, res: Response) {
    try{
        const columna = await em.create(Columna, res.locals.columnaNueva)
        await em.flush()
        res.status(201).json({message: "Columna creada", data: columna})
} catch (err) {
    handleOrmError(res, err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const columna = await em.findOneOrFail(Columna, {id: res.locals.id})
        em.assign(columna, res.locals.columnaParcial)
        await em.flush()
        res.json({message: "Columna actualizada", data: columna})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const columna = await em.findOneOrFail(Columna, {id: res.locals.id})
        const columnaRef = em.getReference(Columna, res.locals.id)
        await em.removeAndFlush(columnaRef)

        res.json({message: "Columna eliminada", data: columna})
    }   catch (err) {
        handleOrmError(res, err)
    }
}

//middleware

function validateExists(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id))
        return res.status(400).json({message: "El id debe ser un número entero"})

    res.locals.id = id

    next();
}

async function sanitizeInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarColumna(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const columnaNueva = incoming.output

    res.locals.columnaNueva = columnaNueva

    const sanitizedInput = res.locals.columnaNueva

    Object.keys(sanitizedInput).forEach((key) => {
        if (sanitizedInput[key] === undefined) {
            delete sanitizedInput[key];
        }
    });

    next()
}

async function sanitizePartialInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarColumnaOpcional(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const columnaParcial = incoming.output

    res.locals.columnaParcial = columnaParcial

    const sanitizedInput = res.locals.columnaParcial

    Object.keys(sanitizedInput).forEach((key) => {
        if (sanitizedInput[key] === undefined) {
            delete sanitizedInput[key];
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