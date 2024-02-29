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
});

router.put('/updateLikeStatus/:id',async(req,res) => {
    console.log("inside put ",req.params.id);
    console.log("Inside put ", req.body);
    try{
        const id = req.params.id;
        const { isLiked } = req.body;
        await User.findOneAndUpdate(id, { isLiked});
        res.status(200).send("Like status update succesfully");
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});
