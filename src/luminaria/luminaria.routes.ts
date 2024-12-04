import {Request, Response, NextFunction, Router} from "express";
import {findAll, findOne, add, update, remove, sanitizeInput, sanitizePartialInput} from "./luminaria.controller.js";

export const luminariaRouter = Router();

luminariaRouter.get("/", findAll);
luminariaRouter.post("/", sanitizeInput, add);

luminariaRouter.get("/:id", findOne);
luminariaRouter.put("/:id", sanitizeInput, update);
luminariaRouter.patch("/:id", sanitizePartialInput, update);
luminariaRouter.delete("/:id", remove);
