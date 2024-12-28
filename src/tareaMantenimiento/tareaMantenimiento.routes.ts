import { Request, Response, NextFunction, Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput } from "./tareaMantenimiento.controller.js";

export const tareaMantenimientoRouter = Router();

tareaMantenimientoRouter.get("/", findAll);
tareaMantenimientoRouter.post("/", sanitizeInput, add);

tareaMantenimientoRouter.get("/:id", validateExists, findOne);
tareaMantenimientoRouter.put("/:id", validateExists, sanitizeInput, update);
tareaMantenimientoRouter.patch("/:id", validateExists, sanitizePartialInput, update);
tareaMantenimientoRouter.delete("/:id", validateExists, remove);