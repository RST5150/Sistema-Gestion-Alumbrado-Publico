import { Request, Response, NextFunction } from "express";
import { Empleado } from "../../empleado/empleado.entity.js";
import { orm } from "../db/orm.js";
import jwt from "jsonwebtoken";

const apiSecret = process.env.apiSecret

export async function authenticate(req: Request, res: Response, next: NextFunction) {

	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return res.sendStatus(401);
		}
		if (!apiSecret) {
		  return res.status(500).json({ message: "Error interno del servidor" });
		}
		const decoded = jwt.verify(authorization, apiSecret) as { dni: string };
		const { dni } = decoded;
		const empleado = await orm.em.findOne(Empleado, { dni: dni });
		if (!empleado) {
			return res.sendStatus(401);
		}
		(req as any).empleado = empleado;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Error durante la autenticación del usuario" });
	}
}
