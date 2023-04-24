import express from 'express'
import usersRoutes from './Routes/usersRoutes.js'; // Import the users routes
import animalsRoutes from './Routes/animalsRoutes.js'; // Import the users routes
import postsRoutes from './Routes/postsRoutes.js'; // Import the users routes
import postsFavouritesRoutes from './Routes/post_favouritesRoutes.js'; // Import the users routes
import authRoutes from './Routes/authRoutes.js'; // Import the users routes


const PORT = 3001;
const app = express()

app.use('/auth', authRoutes);
  
app.use('/users', usersRoutes);

app.use('/animals', animalsRoutes);

app.use('/posts', postsRoutes);

app.use('/post_favourites', postsFavouritesRoutes);


app.listen(PORT, () => {
    console.log("hello");
})