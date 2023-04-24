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


router.get('/', verifyToken, (req, res) => {
    db.all('SELECT * FROM users', function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' }); // Send error response
        } else {
            console.log(rows);
            res.status(200).json(rows); // Send JSON response
        }
    });
});

router.get('/:user_id', verifyToken, (req, res) => {
    const { user_id } = req.params;

    db.get('SELECT * FROM users WHERE user_id = ?', [user_id], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving user from database');
        } else if (row) {
            console.log(row);
            res.status(200).json(row);
        } else {
            res.status(404).send('User not found');
        }
    });
});

router.post('/create', verifyToken, (req, res) => {
    const { user_firstname, user_lastname, user_password, user_email, user_phone } = req.body;
  
    db.run(`INSERT INTO users (user_firstname, user_lastname, user_password, user_email, user_phone) 
      VALUES (?, ?, ?, ?, ?)`, [user_firstname, user_lastname, user_password, user_email, user_phone], function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating user');
        } else {
            res.status(201).json({ message: 'Operation completed successfully' });
        }
    });
});

router.put('/update/:user_id', verifyToken, (req, res) => {
    const { user_id } = req.params;
    const { user_firstname, user_lastname, user_password, user_email, user_phone } = req.body;
  
    db.run(`UPDATE users SET user_firstname = ?, user_lastname = ?, user_password = ?, 
      user_email = ?, user_phone = ? WHERE user_id = ?`, 
      [user_firstname, user_lastname, user_password, user_email, user_phone, user_id], function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating user');
        } else if (this.changes > 0) {
            console.log(`User with ID ${user_id} updated successfully`);
            res.status(200).send('Operation completed successfully');
        } else {
            res.status(404).send('User not found');
        }
    });
});

router.delete('/delete/:user_id', verifyToken, (req, res) => {
    const { user_id } = req.params;
  
    db.run('DELETE FROM users WHERE user_id = ?', [user_id], function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting user');
        } else if (this.changes > 0) {
            console.log(`User with ID ${user_id} deleted successfully`);
            res.status(200).json({ message: 'Operation completed successfully' });
        } else {
            res.status(404).send('User not found');
        }
    });
});


export default router;
