import { Request, Response, NextFunction } from 'express'
import { ServicioLuz } from './servicioLuz.entity.js'
import { validarServicioLuz, validarServicioLuzOpcional } from './servicioLuz.schema.js'
import { orm } from '../shared/db/orm.js'
import { Columna } from "../columna/columna.entity.js";

const ERR_500 = "Oops! Something went wrong. This is our fault."

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const serviciosLuz = await em.find(ServicioLuz, {}, {populate: ['luminarias', 'equipoAuxiliar', 'columna', 'mantenimientos']})
        res.json({data: serviciosLuz})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const servicioLuz = await em.findOneOrFail(ServicioLuz, {id: res.locals.id}, {populate: ['luminarias', 'equipoAuxiliar', 'columna', 'mantenimientos']})
        res.json({data: servicioLuz})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function add(req: Request, res: Response) {
    try {
        const servicioLuz = em.create(ServicioLuz, res.locals.servicioLuzNuevo)
        if (res.locals.servicioLuzNuevo.columna) {
            const columna = em.getReference(Columna, res.locals.servicioLuzNuevo.columna)
            servicioLuz.columna.add(columna)
        }
        await em.flush()
        res.status(201).json({message: "Servicio de luz creado", data: servicioLuz})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const servicioLuz = await em.findOneOrFail(ServicioLuz, {id: res.locals.id})
        em.assign(servicioLuz, res.locals.servicioLuzParcial)
        await em.flush()
        res.json({message: "Servicio de luz actualizado", data: servicioLuz})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const servicioLuz = await em.findOneOrFail(ServicioLuz, {id: res.locals.id})
        const servicioLuzRef = em.getReference(ServicioLuz, res.locals.id)
        await em.removeAndFlush(servicioLuzRef)

        res.json({message: "Servicio de luz eliminado", data: servicioLuz})
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
    const incoming = await validarServicioLuz(req.body)
    if (!incoming.success){
        console.log("Body recibido:", req.body)
        return res.status(400).json({message: incoming.issues[0].message})}
    const servicioLuzNuevo = incoming.output

    res.locals.servicioLuzNuevo = servicioLuzNuevo

    const sanitizedInput = res.locals.servicioLuzNuevo

    console.log("Body recibido:", req.body)
    console.log("Body sanitizado:", sanitizedInput);


    Object.keys(sanitizedInput).forEach(key => {
        if (sanitizedInput[key] === undefined){
            delete sanitizedInput[key]
            }
    });
    
    next()
}

async function sanitizePartialInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarServicioLuzOpcional(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const servicioLuzParcial = incoming.output

    res.locals.servicioLuzParcial = servicioLuzParcial

    const sanitizedInput = res.locals.servicioLuzParcial

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