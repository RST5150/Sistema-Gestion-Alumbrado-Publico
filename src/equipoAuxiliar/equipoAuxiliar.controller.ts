import { Request, Response, NextFunction } from "express";
import { EquipoAux } from "./equipoAuxiliar.entity.js";
import { validarEquipoAuxiliar, validarEquipoAuxiliarOpcional } from "./equipoAuxiliar.schema.js";
import { orm } from "../shared/db/orm.js";

// Mensajes
const ERR_500 = "Oops! Something went wrong. This is our fault."

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const equipoAuxiliar = await em.find(EquipoAux, {})
        res.json({date: equipoAuxiliar})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const equipoAuxiliar = await em.findOneOrFail(EquipoAux, {id: res.locals.id})
        res.json({data: equipoAuxiliar})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function add(req: Request, res: Response) {
    try{
        const equipoAuxiliar = await em.create(EquipoAux, res.locals.equipoAuxiliarNuevo)
        await em.flush()
        res.status(201).json({message: "Equipo Auxiliar creado", data: equipoAuxiliar})
} catch (err) {
    handleOrmError(res, err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const equipoAuxiliar = await em.findOneOrFail(EquipoAux, {id: res.locals.id})
        em.assign(EquipoAux, res.locals.sanitizedPartialInput)
        await em.flush()
        res.json({message: "Equipo Auxiliar actualizada", data: equipoAuxiliar})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const equipoAuxiliar = await em.findOneOrFail(EquipoAux, {id: res.locals.id})
        const equipoAuxiliarRef = em.getReference(EquipoAux, res.locals.id)
        await em.removeAndFlush(equipoAuxiliarRef)

        res.json({message: "Equipo Auxiliar eliminado", data: equipoAuxiliar})
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
    const incoming = await validarEquipoAuxiliar(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const columnaNueva = incoming.output

    res.locals.sanitizedInput = columnaNueva

    next()
}

async function sanitizePartialInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarEquipoAuxiliarOpcional(req.body)
    
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const columnaNueva = incoming.output

    res.locals.sanitizedPartialInput = columnaNueva

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
              res.status(404).json({message: `Equipo Auxiliar no encontrado para ese ID ${res.locals.id}`})
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

     // end middleware

export { findAll, findOne, add, update, remove, validateExists, sanitizeInput, sanitizePartialInput }