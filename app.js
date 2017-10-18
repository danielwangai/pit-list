import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './src/api/auth/models/user.js';
import Bucketlist from './src/api/bucketlists/models/bucketlist';


const app = express();

mongoose.connect('mongodb://localhost/test', { useMongoClient: true});

let user = new User({
  username: "danielmaina",
  email: "dan@mail.com",
  password: "password"
})

let bucketlist = new Bucketlist({
  name: "bucket 1",
  description: "descr 1",
  user: user
})
user.save();
app.use(logger('dev'))
;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/test-url", (req, res) => res.status(200).send({
  "message": "Welcome to PITLIST"
}))

console.log("new User\n\n", user)
console.log("new bucket\n\n", bucketlist)
app.listen(3000, ()=>{
  console.log("Server is ok at "+ 3000)
})

export default app;
