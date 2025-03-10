import { app } from './app.js';

// Necesitamos separar el módulo que configura la app de Express, del módulo que
//   inicia el servidor (lo activa en un puerto) para que la suite de testing
//   pueda importarla y usarla correctamente
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  })