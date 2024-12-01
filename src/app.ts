import express from 'express';
import { orm, syncSchema } from './shared/db/orm.js';

const app = express();

app.use('/', (req, res) => {
  res.send('Hello World');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})

await syncSchema()