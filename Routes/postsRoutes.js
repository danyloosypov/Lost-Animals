import express from 'express';
import {db} from '../db/db.js'; 
import jwt from 'jsonwebtoken';
import multer from 'multer';
import SECRET_KEY from '../config.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.use(express.json());

const __dirname = path.dirname(new URL(import.meta.url).pathname);


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

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
      }
    })
  });

  router.post('/create', verifyToken, upload.single('post_image'), (req, res) => {
    const { post_mode, animal_id, user_id, animal_breed, animal_color, animal_gender, location, description } = req.body;
    const post_image = req.file ? req.file.filename : null; // Get the filename of the uploaded file
  
    const sql = `INSERT INTO posts (post_mode, animal_id, user_id, animal_breed, animal_color, animal_gender, location, post_image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [post_mode, animal_id, user_id, animal_breed, animal_color, animal_gender, location, post_image, description], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Operation completed successfully' });
      }
    });
  });
  
  // READ all posts
router.get('/', verifyToken, (req, res) => {
    const sql = `SELECT * FROM posts`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(rows);
        }
    });
});
  
  // READ a specific post by ID
router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM posts WHERE post_id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!row) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.status(200).json(row);
        }
    });
});
  
  // UPDATE a post
  router.put('/update/:id', upload.single('post_image'), (req, res) => {
    const { id } = req.params;
    const { post_mode, animal_id, user_id, animal_breed, animal_color, animal_gender, location, description } = req.body;
    let post_image = req.body.post_image; // Get the new image filename from the request body
  
    // Fetch the old image filename from the database
    const selectSql = `SELECT post_image FROM posts WHERE post_id = ?`;
    db.get(selectSql, [id], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else if (!row) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        const oldPostImage = row.post_image;
  
        // Delete the old image file if a new image file is uploaded
        if (req.file) {
          fs.unlink('uploads/' + oldPostImage, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Previous image file deleted successfully');
            }
          });
          post_image = req.file.filename;
        }
  
        const sql = `UPDATE posts SET post_mode = ?, animal_id = ?, user_id = ?, animal_breed = ?, animal_color = ?, animal_gender = ?, location = ?, post_image = ?, description = ? WHERE post_id = ?`;
        db.run(sql, [post_mode, animal_id, user_id, animal_breed, animal_color, animal_gender, location, post_image, description, id], function(err) {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
          } else if (this.changes === 0) {
            res.status(404).json({ error: 'Post not found' });
          } else {
            res.status(200).json({ message: 'Operation completed successfully' });
          }
        });
      }
    });
  });


  /// изначальный метод update
  /*router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { post_mode, animal_id, user_id, animal_breed, animal_color, animal_gender, location, post_image, description } = req.body;
    const sql = `UPDATE posts SET post_mode = ?, animal_id = ?, user_id = ?, animal_breed = ?, animal_color = ?, animal_gender = ?, location = ?, post_image = ?, description = ? WHERE post_id = ?`;
    db.run(sql, [post_mode, animal_id, user_id, animal_breed, animal_color, animal_gender, location, post_image, description, id], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ message: 'Operation completed successfully' });
      }
    });
  });*/

router.delete('/delete/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM posts WHERE post_id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.status(200).json({ message: 'Operation completed successfully' });
        }
    });
});


export default router;
