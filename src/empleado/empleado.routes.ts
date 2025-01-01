import { Request, Response, NextFunction, Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput } from "./empleado.controller.js";

export const empleadoRouter = Router();

empleadoRouter.get("/", findAll);
empleadoRouter.post("/", sanitizeInput, add);

empleadoRouter.get("/:id", validateExists, findOne);
empleadoRouter.put("/:id", validateExists, sanitizeInput, update);
empleadoRouter.patch("/:id", validateExists, sanitizePartialInput, update);
empleadoRouter.delete("/:id", validateExists, remove);
