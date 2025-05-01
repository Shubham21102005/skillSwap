const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const postRoutes= require('./routes/postRoutes.js')
const requestRoutes = require('./routes/requestRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/post',postRoutes);
app.use('/requests', requestRoutes);


// Constants
const PORT = 3000;
const MONGO_URL = process.env.MONGO_URL;

// MongoDB Connection
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

