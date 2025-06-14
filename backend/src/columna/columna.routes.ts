import { Request, Response, NextFunction, Router } from "express";
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  sanitizeInput,
  validateExists,
  sanitizePartialInput,
  findManyByIds,
  findManyByAttributes,
} from "./columna.controller.js";
import { authenticate } from "../shared/middlewares/authenticate.js";

export const columnaRouter = Router();

columnaRouter.get("/", authenticate, findAll);
columnaRouter.post("/", authenticate, sanitizeInput, add);

columnaRouter.get("/:id", authenticate, validateExists, findOne);
columnaRouter.put("/:id", authenticate, validateExists, sanitizeInput, update);
columnaRouter.patch("/:id", authenticate, validateExists, sanitizePartialInput, update);
columnaRouter.delete("/:id", authenticate, validateExists, remove);

columnaRouter.post("/findManyIds", authenticate, findManyByIds);
columnaRouter.post("/findMany", authenticate, sanitizePartialInput, findManyByAttributes);

export default columnaRouter;
