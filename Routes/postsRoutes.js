import express from 'express';
import {db} from '../db/db.js'; 
import jwt from 'jsonwebtoken';
import multer from 'multer';
import SECRET_KEY from '../config.js';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const router = express.Router();

router.use(express.json());

router.use(cors({
  origin: 'http://localhost:3000'
}));


const __dirname = path.dirname(new URL(import.meta.url).pathname);


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
  router.get('/', (req, res) => {
    const animalId = req.query.animal_id;
    const animalBreed = req.query.animal_breed;
    const animalColor = req.query.animal_color;
    const animalGender = req.query.animal_gender;
    const description = req.query.description;
    const location = req.query.location;
    const post_mode = req.query.post_mode;

    let sql = `SELECT * FROM posts`;

    let filters = [];

    if (post_mode) {
      filters.push(`post_mode = ${post_mode}`);
    }

    if (animalId) {
        filters.push(`animal_id = ${animalId}`);
    }

    if (animalBreed) {
        filters.push(`animal_breed LIKE '%${animalBreed}%'`);
    }

    if (animalColor) {
        filters.push(`animal_color LIKE '%${animalColor}%'`);
    }

    if (animalGender) {
        filters.push(`animal_gender = '${animalGender}'`);
    }

    if (location) {
        filters.push(`location LIKE '%${location}%'`);
    }

    if (description) {
        filters.push(`description LIKE '${description}'`);
    }

    if (filters.length > 0) {
        sql += ` WHERE ${filters.join(' AND ')}`;
    }
    console.log(sql);

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
router.get('/:id', (req, res) => {
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

router.get('/my-posts/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM posts WHERE user_id = ?`;
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

  router.delete('/delete/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sqlGetPost = `SELECT * FROM posts WHERE post_id = ?`;
    const sqlDeletePost = `DELETE FROM posts WHERE post_id = ?`;

    db.get(sqlGetPost, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!row) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            const postImage = row.post_image;

            // Delete the post image file
            if (postImage) {
              fs.unlink('uploads/' + postImage, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Image file deleted successfully');
                }
              });
            }

            // Delete the post from the database
            db.run(sqlDeletePost, [id], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.status(200).json({ message: 'Operation completed successfully' });
                }
            });
        }
    });
});



export default router;
