import fs from 'fs';
import mysql from 'mysql2/promise';

export const conexion = mysql.createPool(JSON.parse(fs.readFileSync('./src/config/db.json')));
conexion.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
});

