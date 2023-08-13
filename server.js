const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectToDB = require('./db');
const helmet = require('helmet');

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

// connect to DB
connectToDB();

// add middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
];

app.use(cors({
  origin: function(origin, callback){

    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow external access...';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));

// add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));

// if any other link just serve react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// if bad link return 404
app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

module.exports = server;