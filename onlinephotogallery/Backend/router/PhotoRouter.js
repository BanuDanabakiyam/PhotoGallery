import express from "express";
import User from "../model/User.js";
export const router = express.Router();
router.post("/photos",async(req,res) => {
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
        res.status(500).json({message:err.message});
    }
})
