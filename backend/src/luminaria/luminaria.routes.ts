import { Router} from "express";
import {findAll, findOne, add, update, remove, sanitizeInput, sanitizePartialInput, validateExists, findManyByAttributes} from "./luminaria.controller.js";
import { authenticate } from "../shared/middlewares/authenticate.js";

export const luminariaRouter = Router();

luminariaRouter.get("/", authenticate, findAll);
luminariaRouter.post("/", authenticate, sanitizeInput, add);

luminariaRouter.get("/:id", authenticate, validateExists, findOne);
luminariaRouter.put("/:id", authenticate, validateExists, sanitizeInput, update);
luminariaRouter.patch("/:id", authenticate, validateExists, sanitizePartialInput, update);
luminariaRouter.delete("/:id", authenticate, validateExists, remove);

luminariaRouter.post("/findMany", authenticate, sanitizePartialInput, findManyByAttributes);
