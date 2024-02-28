import express  from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
const port = 8000;
const url = "mongodb+srv://banubala9655:12345@cluster0.fo9wq9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const db = mongoose.connect(url).then(() =>{
    console.log("Yes ! I am connected ")
});

app.listen(port,() => {
    console.log("yes I am Listening")
})

