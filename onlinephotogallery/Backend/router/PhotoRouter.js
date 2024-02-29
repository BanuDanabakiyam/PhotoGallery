import express from "express";
import User from "../model/User.js";
export const router = express.Router();
router.post("/users",async(req,res) => {
    try{
        console.log("Inside post");
        const {photographerName,photoURL,description} = req.body;
        const newUser = new User({
            photographerName,
            photoURL,
            description,
            createdTime: new Date(),
            isLiked:false
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(404).json({message:err.message});
    }
})
