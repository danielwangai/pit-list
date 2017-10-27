import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bluebird from 'bluebird';
import cors from 'cors';

// import routers
import router from './src/api/routes/routes';

mongoose.Promise = bluebird;

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGOLAB_URI);

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

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/api/v1', router);

console.log("new routes\n\n", router);

app.listen(PORT, ()=>{
  console.log("Server is ok at "+ PORT);
})

export default app;
