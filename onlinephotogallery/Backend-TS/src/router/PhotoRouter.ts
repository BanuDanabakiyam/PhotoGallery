import express, { Request, Response } from "express";
import Users,{User} from "../model/User";
export const router = express.Router();

router.post("/photos", async (req: Request, res: Response) => {
    try {
        const { photographerName, photoURL, description } = req.body;
        const newUser: User = new Users({
            photographerName,
            photoURL,
            description,
            createdTime: new Date(),
            isLiked: false
        });
        const savedUser: User = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/updateLikeStatus/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const { isLiked } = req.body;
        await Users.findByIdAndUpdate(id, { isLiked });
        res.status(200).send("Like status update successfully");
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});
