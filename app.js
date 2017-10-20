import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// import routers
import router from './src/api/routes/routes';

import User from './src/api/auth/models/user.js';
import Bucketlist from './src/api/bucketlists/models/bucketlist';


mongoose.connect('mongodb://localhost/pitlist');

let db = mongoose.connection;

// check db connection
db.once('open', () => {
  console.log("Connected to MongoDB");
})

db.on('error', (err) => {
  console.log("DB ERROR\n\n", err);
})

// load environment variables.
dotenv.load();

// mongoose.Promise = global.Promise;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

console.log("new routes\n\n", router)

app.listen(3000, ()=>{
  console.log("Server is ok at "+ 3000)
})

export default app;
