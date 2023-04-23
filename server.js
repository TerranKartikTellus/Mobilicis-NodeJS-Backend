const mongoose = require('mongoose');
const express = require('express');
const app = express();
const fs = require('fs');
const User = require('./db/schema');
const PORT = process.env.PORT || 3030;
require('dotenv').config();

const usersRouter = require('./db/routes/user');
const incomeCarRouter = require('./db/routes/one-income-car')
const malePhone = require('./db/routes/male-phone')
const charLenEmail = require('./db/routes/char-len-email')
const carEmail = require('./db/routes/car-email')
const topCities = require('./db/routes/top-cities')

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
const uri = `mongodb+srv://${db_user}:${db_pass}@cluster0.149afcl.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


app.use('/api/users', usersRouter);
app.use('/api/users', incomeCarRouter);
app.use('/api/users', malePhone);


app.use('/api/users', charLenEmail);
app.use('/api/users', carEmail);
app.use('/api/users', topCities);















// db.once('open', function() {
//     User.insertMany(sampleData)
//     .then(() => {
//       console.log('Sample data inserted successfully');
//     })
//     .catch((error) => {
//       console.error('Error inserting sample data:', error);
//     });
// });

