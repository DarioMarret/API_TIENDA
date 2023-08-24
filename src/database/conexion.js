import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import mysql from 'mysql2/promise';


// crea una conexion a la base de datos url  mysql://doadmin:
// mostrar contraseña
// @db-mysql-codigomarret-do-user-8297409-0.b.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUERIDO

export const conexion = mysql.createPool({
    host: '177.234.209.101',
    port: 3306,
    user: 'root',
    password: 'boleteria',
    database: 'tienda',
    waitForConnections: true,
    connectionLimit: 100,
});

// export const conexion = mysql.createPool(JSON.parse(fs.readFileSync(path.join(__dirname, '../config/db.json'), 'utf8')));
// conexion.on(`error`, (err) => {
//     console.error(`Connection error ${err.code}`);
// });
    
conexion.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
});
