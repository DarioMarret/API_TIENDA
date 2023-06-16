import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import mysql from 'mysql2/promise';


// crea una conexion a la base de datos url  mysql://doadmin:
// mostrar contraseña
// @db-mysql-codigomarret-do-user-8297409-0.b.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUERIDO

export const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
});

// export const conexion = mysql.createPool(JSON.parse(fs.readFileSync(path.join(__dirname, '../config/db.json'), 'utf8')));
// conexion.on(`error`, (err) => {
//     console.error(`Connection error ${err.code}`);
// });
    
conexion.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
});
