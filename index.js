import express from 'express'
import sqlite3 from 'sqlite3';

//const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('lb2.db');

const PORT = 3001;
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello1</h1>')
})

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', function(err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' }); // Send error response
      } else {
        console.log(rows);
        res.json(rows); // Send JSON response
      }
    });
  });

app.listen(PORT, () => {
    console.log("hello");
})