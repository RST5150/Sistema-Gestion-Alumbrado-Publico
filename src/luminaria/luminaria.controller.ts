import { Request, Response, NextFunction } from 'express'
import { Luminaria } from './luminaria.entity.js'
import { validarLuminaria, validarLuminariaOpcional } from './luminaria.schema.js'
import { orm } from '../shared/db/orm.js'

const ERR_500 = 'Oops! Something went wrong. This is our fault.'

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const luminarias = await em.find(Luminaria, {})
        res.json({data: luminarias})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const luminaria = await em.findOneOrFail(Luminaria, {id: res.locals.id})
        res.json({data: luminaria})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function add(req: Request, res: Response) {
    try {
        const luminaria = await em.create(Luminaria, res.locals.luminariaNueva)
        await em.flush()
        res.status(201).json({message: 'Luminaria creada', data: luminaria})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const luminaria = await em.findOneOrFail(Luminaria, {id: res.locals.id})
        em.assign(luminaria, res.locals.luminariaParcial)
        await em.flush()
        res.json({message: 'Luminaria actualizada', data: luminaria})
    } catch (err) {
        handleOrmError(res, err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const luminaria = await em.findOneOrFail(Luminaria, {id: res.locals.id})
        const luminariaRef = em.getReference(Luminaria, res.locals.id)
        await em.removeAndFlush(luminariaRef)

        res.json({message: 'Luminaria eliminada', data: luminaria})
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

    next();
}

async function sanitizeInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarLuminaria(req.body)
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const luminariaNueva = incoming.output

    res.locals.luminariaNueva = luminariaNueva

    const sanitizedInput = res.locals.luminariaNueva

    Object.keys(sanitizedInput).forEach((key) => {
        if (sanitizedInput[key] === undefined) {
            delete sanitizedInput[key];
        }
    });

    next()
}

async function sanitizePartialInput(req: Request, res: Response, next: NextFunction) {
    const incoming = await validarLuminariaOpcional(req.body)
    
    if (!incoming.success)
        return res.status(400).json({message: incoming.issues[0].message})
    const luminariaParcial = incoming.output

    res.locals.luminariaParcial = luminariaParcial

    const sanitizedInput = res.locals.luminariaParcial

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
              res.status(404).json({message: `Luminaria no encontrada para ese ID ${res.locals.id}`})
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

export { findAll, findOne, add, update, remove, validateExists, sanitizeInput, sanitizePartialInput}