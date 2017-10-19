import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongodb from 'mongodb';

// import routers
import router from './src/api/routes/routes';

import User from './src/api/auth/models/user.js';
import Bucketlist from './src/api/bucketlists/models/bucketlist';

// mongoose.Promise = global.Promise;
const app = express();

const MongoClient = mongodb.MongoClient, assert = require('assert');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

MongoClient.connect('mongodb://localhost/test', (err, database) => {
  if (err) return console.log("Mongodb ERROR", err)
  console.log("Connection success\n\n")
  database.close();
})
console.log("new routes\n\n", router)

app.listen(3000, ()=>{
  console.log("Server is ok at "+ 3000)
})

export default app;
