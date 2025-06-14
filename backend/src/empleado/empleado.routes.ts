import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeInput, validateExists, sanitizePartialInput, login, signup } from "./empleado.controller.js";
import { authenticate } from "../shared/middlewares/authenticate.js";

export const empleadoRouter = Router();

empleadoRouter.get("/", authenticate, findAll);
empleadoRouter.post("/", authenticate, sanitizeInput, add);

empleadoRouter.get("/:id", authenticate, validateExists, findOne);
empleadoRouter.put("/:id", authenticate, validateExists, sanitizeInput, update);
empleadoRouter.patch("/:id", authenticate, validateExists, sanitizePartialInput, update);
empleadoRouter.delete("/:id", authenticate, validateExists, remove);

empleadoRouter.post("/login", sanitizePartialInput, login);
empleadoRouter.post("/signup", sanitizePartialInput, signup);
