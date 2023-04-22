const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});


const uri = "mongodb+srv://terrankartiktellus:qwerty22@cluster0.149afcl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});
