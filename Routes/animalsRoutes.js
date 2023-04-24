import express from 'express';
import {db} from '../db/db.js'; 
import jwt from 'jsonwebtoken';
import SECRET_KEY from '../config.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

function verifyToken(req, res, next) {
    const bearer = req.headers['authorization'].split(" ");
    const token = bearer[1];
    if (!token) {
        console.log(1);
        return res.status(401).send('Unauthorized request');
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(2);
            return res.status(401).send('Unauthorized request');
        }
        req.user = decoded;
        next();
    });
}

router.post('/create', verifyToken, (req, res) => {
    const { animal_species } = req.body;
  
    db.run('INSERT INTO animals (animal_species) VALUES (?)', [animal_species], function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating animal');
        } else {
            console.log(`Animal with ID ${this.lastID} created successfully`);
            res.status(201).json({ message: 'Operation completed successfully', animal_id: this.lastID });
        }
    });
});
  
  // Read all animals
router.get('/', verifyToken, (req, res) => {
    db.all('SELECT * FROM animals', function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching animals');
        } else {
            res.status(200).json(rows);
        }
    });
});
  
  // Read animal by ID
router.get('/:animal_id', verifyToken, (req, res) => {
    const { animal_id } = req.params;
  
    db.get('SELECT * FROM animals WHERE animal_id = ?', [animal_id], function(err, row) {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching animal');
        } else if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).send('Animal not found');
        }
    });
});
  
  // Update animal by ID
  router.put('/update/:animal_id', verifyToken, (req, res) => {
    const { animal_id } = req.params;
    const { animal_species } = req.body;
  
    db.run('UPDATE animals SET animal_species = ? WHERE animal_id = ?', [animal_species, animal_id], function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating animal');
        } else if (this.changes > 0) {
            console.log(`Animal with ID ${animal_id} updated successfully`);
            res.status(200).json({ message: 'Operation completed successfully' });
        } else {
            res.status(404).send('Animal not found');
        }
    });
});
  
  // Delete animal by ID
router.delete('/delete/:animal_id', verifyToken, (req, res) => {
    const { animal_id } = req.params;
  
    db.run('DELETE FROM animals WHERE animal_id = ?', [animal_id], function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting animal');
        } else if (this.changes > 0) {
            console.log(`Animal with ID ${animal_id} deleted successfully`);
            res.status(200).json({ message: 'Operation completed successfully' });
        } else {
            res.status(404).send('Animal not found');
        }
    });
});


export default router;
