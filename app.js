const express = require('express');
const db = require('./database');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint para crear una persona
app.post('/personas', (req, res) => {
  const { nombre, DNI, fecha_nacimiento } = req.body;
  const sql = `INSERT INTO Persona (nombre, DNI, fecha_nacimiento) VALUES (?, ?, ?)`;
  db.run(sql, [nombre, DNI, fecha_nacimiento], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint para obtener todas las personas
app.get('/personas', (req, res) => {
  const sql = `SELECT * FROM Persona`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: rows });
  });
});

// Endpoint para obtener una persona por su ID
app.get('/personas/:id', (req, res) => {
  const sql = `SELECT * FROM Persona WHERE Id = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.status(200).json({ data: row });
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  });
});

// Endpoint para actualizar una persona
app.put('/personas/:id', (req, res) => {
  const { nombre, DNI, fecha_nacimiento } = req.body;
  const sql = `UPDATE Persona SET nombre = ?, DNI = ?, fecha_nacimiento = ? WHERE Id = ?`;
  db.run(sql, [nombre, DNI, fecha_nacimiento, req.params.id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: 'Persona actualizada' });
  });
});

// Endpoint para eliminar una persona
app.delete('/personas/:id', (req, res) => {
  const sql = `DELETE FROM Persona WHERE Id = ?`;
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: 'Persona eliminada' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});