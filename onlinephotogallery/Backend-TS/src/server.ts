import express,{Express,Request,Response} from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import { router } from './router/PhotoRouter';
import Users, {User}from './model/User';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/',router)
const port = 8000;
const url = "mongodb+srv://banubala9655:12345@cluster0.fo9wq9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url).then(() => {
    console.log("I am connected...")
})

app.get('/getPhotos', async(req: Request, res: Response) => {
    try{
        const users: User[] = await Users.find();
        res.json(users);
    }catch(err: any){
        res.status(500).json(err);
    }
})

app.listen(port,() => {
    console.log("I am listenning...")
})


