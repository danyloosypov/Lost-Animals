import express from 'express';
import {db} from '../db/db.js'; 
import SECRET_KEY from '../config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.use(express.json());


// Register route
router.post('/register', async (req, res) => {
    try {
      // Check if user already exists in the database
      db.get('SELECT * FROM users WHERE user_email = ?', [req.body.user_email], async (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
  
        if (row) {
          return res.status(409).send('Email already exists');
        }
  
        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
  
        // Insert user into the database
        db.run(`INSERT INTO users (user_firstname, user_lastname, user_password, user_email, user_phone) 
        VALUES (?, ?, ?, ?, ?)`, [req.body.user_firstname, req.body.user_lastname, hashedPassword, req.body.user_email, req.body.user_phone], async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
          }
  
          // Send success response
          res.status(201).send('User registered successfully');
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Login route
  router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
      // Find user by username
      db.get('SELECT * FROM users WHERE user_email = ?', [req.body.user_email], async (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
  
        if (!row) {
          return res.status(401).send('Invalid email or password');
        }
  
        // Compare password
        const isPasswordValid = await bcrypt.compare(req.body.user_password, row.user_password);
        if (!isPasswordValid) {
          return res.status(401).send('Invalid email or password');
        }
  
        // Generate JWT token
        const token = jwt.sign({ userId: row.user_id }, SECRET_KEY, { expiresIn: '1h' });

        console.log(token)

        console.log(row.user_id)
  
        // Send success response with JWT token
        res.json({ token, user_id: row.user_id  });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;
