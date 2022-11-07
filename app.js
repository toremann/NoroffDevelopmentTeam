const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

require('dotenv').config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;
const openlibraryAPI = 'https://openlibrary.org/isbn/'

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


// ISBN search using 
app.get('/ISBN/:id', async (req, res) => {
  try {
    const response = await axios.get(openlibraryAPI + req.params.id);
    console.log(`Response for ISBN: ${req.params.id}`)
    console.log(response.data)
    res.send(response.data)
  } catch (err) {
    console.log(`No book with that ISBN number` + err);
    res.status(500).send(`No book with that ISBN number`)
  }
})

