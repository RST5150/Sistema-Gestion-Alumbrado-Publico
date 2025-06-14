import { Router} from "express";
import {findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput} from "./servicioLuz.controller.js";
import { authenticate } from "../shared/middlewares/authenticate.js";

export const servicioLuzRouter = Router();

servicioLuzRouter.get("/", authenticate, findAll);
servicioLuzRouter.post("/", authenticate, sanitizeInput, add);

servicioLuzRouter.get("/:id", authenticate, validateExists, findOne);
servicioLuzRouter.put("/:id", authenticate, validateExists, sanitizeInput, update);
servicioLuzRouter.patch("/:id", authenticate, validateExists, sanitizePartialInput, update);
servicioLuzRouter.delete("/:id", authenticate, validateExists, remove);
