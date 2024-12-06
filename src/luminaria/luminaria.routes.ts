import {Request, Response, NextFunction, Router} from "express";
import {findAll, findOne, add, update, remove, sanitizeInput, sanitizePartialInput, validateExists} from "./luminaria.controller.js";

export const luminariaRouter = Router();

luminariaRouter.get("/", findAll);
luminariaRouter.post("/", sanitizeInput, add);

luminariaRouter.get("/:id", validateExists, findOne);
luminariaRouter.put("/:id", validateExists, sanitizeInput, update);
luminariaRouter.patch("/:id", validateExists, sanitizePartialInput, update);
luminariaRouter.delete("/:id", validateExists, remove);
