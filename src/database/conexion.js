import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export const conexion = mysql.createPool(JSON.parse(fs.readFileSync(path.join(__dirname, '../config/database.json'), 'utf8')));
conexion.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
});

