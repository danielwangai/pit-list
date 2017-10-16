import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';


const app = express();

app.use(logger('dev'))
;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/test-url", (req, res) => res.status(200).send({
    "message": "Welcome to PITLIST"
}))

app.listen(3000, ()=>{
    console.log("Server is ok at "+ 3000)
})

export default app;
