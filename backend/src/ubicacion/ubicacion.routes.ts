import {Request, Response, NextFunction, Router} from "express";
import {findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput} from "./ubicacion.controller.js";

export const ubicacionRouter = Router();

ubicacionRouter.get("/", findAll);
ubicacionRouter.post("/", sanitizeInput, add);

ubicacionRouter.get("/:id", validateExists, findOne);
ubicacionRouter.put("/:id", validateExists, sanitizeInput, update);
ubicacionRouter.patch("/:id", validateExists, sanitizePartialInput, update);
ubicacionRouter.delete("/:id", validateExists, remove);
