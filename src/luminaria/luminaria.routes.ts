import {Request, Response, NextFunction, Router} from "express";
import {findAll, findOne, add, update, remove, sanitizeInput, sanitizePartialInput, convertToNumber, validateExists} from "./luminaria.controller.js";

export const luminariaRouter = Router();

luminariaRouter.get("/", findAll);
luminariaRouter.post("/", convertToNumber, sanitizeInput, add);

luminariaRouter.get("/:id", validateExists, findOne);
luminariaRouter.put("/:id", convertToNumber, validateExists, sanitizeInput, update);
luminariaRouter.patch("/:id", convertToNumber, validateExists, sanitizePartialInput, update);
luminariaRouter.delete("/:id", validateExists, remove);
