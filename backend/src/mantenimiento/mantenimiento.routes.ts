import { Router } from 'express';
import {findAll, findOne, add, update, remove, sanitizeInput, sanitizePartialInput, validateExists} from "./mantenimiento.controller.js"
import { authenticate } from '../shared/middlewares/authenticate.js';

export const mantenimientoRouter = Router();

mantenimientoRouter.get("/", authenticate, findAll);
mantenimientoRouter.post("/", authenticate, sanitizeInput, add);

mantenimientoRouter.get("/:id", authenticate, validateExists, findOne);
mantenimientoRouter.put("/:id", authenticate, validateExists, sanitizeInput, update);
mantenimientoRouter.patch("/:id", authenticate, validateExists, sanitizePartialInput, update);
mantenimientoRouter.delete("/:id", authenticate, validateExists, remove);
