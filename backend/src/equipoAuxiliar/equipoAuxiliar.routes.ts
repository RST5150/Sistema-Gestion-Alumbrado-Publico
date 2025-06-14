import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput, findManyByAttributes } from "./equipoAuxiliar.controller.js";
import { authenticate } from "../shared/middlewares/authenticate.js";

export const equipoAuxiliarRouter = Router();

equipoAuxiliarRouter.get("/", authenticate, findAll);
equipoAuxiliarRouter.post("/", authenticate, sanitizeInput, add);

equipoAuxiliarRouter.get("/:id", authenticate, validateExists, findOne);
equipoAuxiliarRouter.put("/:id", authenticate, validateExists, sanitizeInput, update);
equipoAuxiliarRouter.patch("/:id", authenticate, validateExists, sanitizePartialInput, update);
equipoAuxiliarRouter.delete("/:id", authenticate, validateExists, remove);

equipoAuxiliarRouter.post("/findMany", authenticate, sanitizePartialInput, findManyByAttributes);
