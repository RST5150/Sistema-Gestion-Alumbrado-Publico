import express from 'express';
import { orm, syncSchema } from './shared/db/orm.js';
import cors from 'cors'
import { RequestContext } from '@mikro-orm/core';

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
// TODO: Configurar por seguridad
app.use(cors())

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/', (req, res) => {
  res.send('Hello World');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})

await syncSchema()