import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import mysql from 'mysql2/promise';


// crea una conexion a la base de datos url  mysql://doadmin:
// mostrar contraseña
// @db-mysql-codigomarret-do-user-8297409-0.b.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUERIDO

export const conexion = mysql.createPool({
    host: 'db-mysql-codigomarret-do-user-8297409-0.b.db.ondigitalocean.com',
    port: 25060,
    user: 'doadmin',
    password: 'AVNS_K-89rKShc1XdYgWthIa',
    database: 'tienda',
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
