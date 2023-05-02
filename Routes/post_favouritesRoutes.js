import express from 'express';
import {db} from '../db/db.js'; 
import jwt from 'jsonwebtoken';
import SECRET_KEY from '../config.js';

const router = express.Router();

router.use(express.json());

function verifyToken(req, res, next) {
    /*const bearer = req.headers['authorization'].split(" ");
    const token = bearer[1];*/
    const token = req.headers['authorization'];
    console.log(token)
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


// CREATE a post favourite
router.post('/create', verifyToken,  (req, res) => {
    const { user_id, post_id } = req.body;
    const sql = `INSERT INTO post_favourites (user_id, post_id) VALUES (?, ?)`;
    db.run(sql, [user_id, post_id], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Post favourite created successfully', id: this.lastID });
        }
    });
});

// READ all post favourites
router.get('/', verifyToken, (req, res) => {
    const sql = `SELECT * FROM post_favourites`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// READ a post favourite by ID
router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM post_favourites WHERE favourites_id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!row) {
            res.status(404).json({ error: 'Post favourite not found' });
        } else {
            res.status(200).json(row);
        }
    });
});

router.get('/my-favourites/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT p.*
        FROM posts p
        INNER JOIN post_favourites pf ON pf.post_id = p.post_id
        WHERE pf.user_id = ?
    `;
    db.all(sql, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!row) {
            res.status(404).json({ error: 'Posts not found' });
        } else {
            res.status(200).json(row);
        }
    });
});

// DELETE a post favourite by ID
router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM post_favourites WHERE favourites_id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Post favourite not found' });
        } else {
            res.status(200).json({ message: 'Post favourite deleted successfully' });
        }
    });
});


// UPDATE a post favourite by ID
router.put('/update/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { user_id, post_id } = req.body;
    const sql = `UPDATE post_favourites SET user_id = ?, post_id = ? WHERE favourites_id = ?`;
    db.run(sql, [user_id, post_id, id], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Post favourite not found' });
        } else {
            res.status(200).json({ message: 'Post favourite updated successfully' });
        }
    });
});

export default router;
