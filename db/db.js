import sqlite3 from 'sqlite3';

// Create a database connection
const db = new sqlite3.Database('./db/lb2.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export { db };