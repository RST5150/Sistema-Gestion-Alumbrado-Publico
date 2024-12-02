# Sistema-Gestion-Alumbrado-Publico
Repo del proyecto del sistema de gestión de alumbrado público, TP final para Analista Desarrollador Universitario en Sistemas

## Integrantes
* XXXXX - Alvarez, Thiago
* XXXXX - Fernandez, Felipe
* XXXXX - Romo, Matias
* 44771 - Salvia, Ricardo

## Paso a Paso para levantar el proyecto (Back)
1. pnpm install (Instala todas las dependencias)
2. pnpm build (Compila el código ts a js)
3. Definir variables de entorno creando un archivo .env en la raiz del proyecto con el siguiente formato
    * baseDir = /api	
    * apiSecret = (Ahora no lo usamos pero va a ser necesario para cuando usemos jwt)
    * dbHost = localhost (Donde corra la DB)
    * dbPort = 3306 (Puerto donde corra la DB)
    * dbUser = **Usuario de la DB** 
    * dbPasswd = **Contraseña del usuario**
    * dbName = **Nombre de la BD a usar**
4. pnpm start:dev (Ejecuta el codigo)

