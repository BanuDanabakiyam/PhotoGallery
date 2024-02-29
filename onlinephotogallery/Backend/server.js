import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import Users from '../Backend/model/User.js';
import { router } from "./router/PhotoRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/',router);
const port = 8000;
const url = "mongodb+srv://banubala9655:12345@cluster0.fo9wq9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const db = mongoose.connect(url).then(() =>{
    console.log("Yes ! I am connected ")
});

app.get('/getPhotos',(req,res) => {
    Users.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
})

app.listen(port,() => {
    console.log("yes I am Listening")
})

