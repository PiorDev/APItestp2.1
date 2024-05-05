const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos (o crearla si no existe)
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado a la base de datos.');
  }
});

// Crear la tabla "Persona" si no existe
db.run(`CREATE TABLE IF NOT EXISTS Persona (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  DNI TEXT NOT NULL UNIQUE,
  fecha_nacimiento TEXT NOT NULL
)`, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Tabla "Persona" creada o ya existente.');
  }
});

module.exports = db;