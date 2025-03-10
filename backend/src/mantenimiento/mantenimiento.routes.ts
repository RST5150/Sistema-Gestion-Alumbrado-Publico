import { Request, Response, NextFunction, Router } from 'express';
import {findAll, findOne, add, update, remove, sanitizeInput, sanitizePartialInput, validateExists} from "./mantenimiento.controller.js"

export const mantenimientoRouter = Router();

mantenimientoRouter.get("/", findAll);
mantenimientoRouter.post("/", sanitizeInput, add);

mantenimientoRouter.get("/:id", validateExists, findOne);
mantenimientoRouter.put("/:id", validateExists, sanitizeInput, update);
mantenimientoRouter.patch("/:id", validateExists, sanitizePartialInput, update);
mantenimientoRouter.delete("/:id", validateExists, remove);