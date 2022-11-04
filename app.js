const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

require('dotenv').config();

// Initialize Express
const app = express();
const port = 3000;
const booksAPI = 'https://openlibrary.org/books/OL82586W.json';

// Database URI from MongoDB Atlas
const dbURI = process.env.MongoURI;

// Connect to database and start Express if connection is successful
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('Mongoose connected to DB successfully');
    app.listen(port, function (err) {
      if (err) console.log('Express failed to start: ' + err);

      console.log(`Express running on ${port}`);
    });
  })
  .catch((err) => console.log('Could not connect to database'));

// Get book using axios
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(booksAPI);
    res.json(response.data);
    console.log(`Book title: ${response.data.title}`);
  } catch (err) {
    console.log(err);
  }
});
