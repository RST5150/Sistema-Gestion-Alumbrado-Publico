import { Request, Response, NextFunction, Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeInput, validateExists } from "./columna.controller.js"; 

export const columnaRouter = Router();

columnaRouter.get("/", findAll);
columnaRouter.post("/", sanitizeInput, add);

columnaRouter.get("/:id", validateExists, findOne);
columnaRouter.put("/:id", validateExists, sanitizeInput, update);
columnaRouter.patch("/:id", validateExists, sanitizeInput, update);
columnaRouter.delete("/:id", validateExists, remove);