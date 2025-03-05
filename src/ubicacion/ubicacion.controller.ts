import { Request, Response, NextFunction } from 'express'
import { Ubicacion } from './ubicacion.entity.js'
import { validarUbicacion, validarUbicacionOpcional } from './ubicacion.schema.js'
import { orm } from '../shared/db/orm.js'

const ERR_500 = "Oops! Something went wrong. This is our fault."

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const ubicaciones = await em.find(Ubicacion, {})
        res.json({data: ubicaciones})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const ubicacion = await em.findOneOrFail(Ubicacion, {id: res.locals.id})
        res.json({data: ubicacion})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function add(req: Request, res: Response) {
    try {
        const ubicacion = await em.create(Ubicacion, res.locals.ubicacionNueva)
        await em.flush()
        res.status(201).json({message: "Ubicacion creada", data: ubicacion})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const ubicacion = await em.findOneOrFail(Ubicacion, {id: res.locals.id})
        em.assign(ubicacion, res.locals.ubicacionParcial)
        await em.flush()
        res.json({message: "Ubicacion actualizada", data: ubicacion})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const ubicacion = await em.findOneOrFail(Ubicacion, {id: res.locals.id})
        const ubicacionRef = em.getReference(Ubicacion, res.locals.id)
        await em.removeAndFlush(ubicacionRef)

        res.json({message: "Ubicacion eliminada", data: ubicacion})
    } catch (err) {
        handleOrmError(res, err)
    }
}

// middleware

function validateExists(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) 
        return res.status(400).json({message: "El id debe ser un número entero"})
    
    res.locals.id = id

    next()
}

async function sanitizeInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarUbicacion(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const ubicacionNueva = incoming.output

    res.locals.ubicacionNueva = ubicacionNueva

    const sanitizedInput = res.locals.ubicacionNueva

    Object.keys(sanitizedInput).forEach(key => {
        if (sanitizedInput[key] === undefined){
            delete sanitizedInput[key]
            }
    });
    
    next()
}

async function sanitizePartialInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarUbicacionOpcional(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const ubicacionParcial = incoming.output

    res.locals.ubicacionParcial = ubicacionParcial

    const sanitizedInput = res.locals.ubicacionParcial

    Object.keys(sanitizedInput).forEach(key => {
        if (sanitizedInput[key] === undefined){
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