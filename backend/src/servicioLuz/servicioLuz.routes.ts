import {Request, Response, NextFunction, Router} from "express";
import {findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput} from "./servicioLuz.controller.js";

export const servicioLuzRouter = Router();



servicioLuzRouter.get("/", findAll);
servicioLuzRouter.post("/", sanitizeInput, add);

servicioLuzRouter.get("/:id", validateExists, findOne);
servicioLuzRouter.put("/:id", validateExists, sanitizeInput, update);
servicioLuzRouter.patch("/:id", validateExists, sanitizePartialInput, update);
servicioLuzRouter.delete("/:id", validateExists, remove);

