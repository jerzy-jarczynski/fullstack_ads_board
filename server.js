const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDB, dbUri } = require('./db');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

// Middleware
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow external access...';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true  // this allows session cookies to be sent across origins
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

const startServer = async () => {
  try {
    await connectToDB();
    
    const store = new MongoStore({
      mongoUrl: dbUri
    });
    
    app.use(session({ 
      secret: 'xyz567', 
      store: store, 
      resave: false, 
      saveUninitialized: false 
    }));    

    // Serve static files
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/client/build')));

    // Routes
    app.use('/api', require('./routes/ads.routes'));
    app.use('/auth', require('./routes/auth.routes'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log('Server is running...');
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();

module.exports = app;