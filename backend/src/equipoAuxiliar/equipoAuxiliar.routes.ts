import { Request, Response, NextFunction, Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput, findManyByAttributes } from "./equipoAuxiliar.controller.js";

export const equipoAuxiliarRouter = Router();

equipoAuxiliarRouter.get("/", findAll);
equipoAuxiliarRouter.post("/", sanitizeInput, add);

equipoAuxiliarRouter.get("/:id", validateExists, findOne);
equipoAuxiliarRouter.put("/:id", validateExists, sanitizeInput, update);
equipoAuxiliarRouter.patch("/:id", validateExists, sanitizePartialInput, update);
equipoAuxiliarRouter.delete("/:id", validateExists, remove);
equipoAuxiliarRouter.post("/findMany", sanitizePartialInput, findManyByAttributes);
