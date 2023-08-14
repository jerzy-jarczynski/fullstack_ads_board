const mongoose = require('mongoose');

const uri = `mongodb+srv://anderfor:${process.env.DB_PASS}@kodilla.vpc6m3e.mongodb.net/NewWaveDB?retryWrites=true&w=majority`;

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = uri;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/adsDBTest';
else dbUri = 'mongodb://localhost:27017/adsDB';

const connectToDB = () => {

  try {
    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
  
    db.once('open', () => {
      if (NODE_ENV !== "test") console.log("Connected to the database");
    });
    db.on('error', err => console.log('Error ' + err));
  } catch (err) {
    if(process.env.debug === true) console.log(err);
    else console.log('Couldn\'t connect to db...');
  }
  
}

module.exports = connectToDB;