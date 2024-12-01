import 'reflect-metadata';
import express from 'express';
import cors from 'cors'
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { columnaRouter } from './columna/columna.routes.js';

export const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
// TODO: Configurar por seguridad
app.use(cors())

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})


app.use('/api/columnas', columnaRouter)

await syncSchema()

app.use((_, res) => {
  return res.status(404).json({message: "Resource not found"})
})