import mongoose, { Schema, Model, Document } from "mongoose";

export interface User extends Document {
    photographerName: string;
    photoURL: string;
    description: string;
    createdTime: Date;
    isLiked: boolean;
}

const userSchema: Schema<User> = new Schema<User>({
    photographerName: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    isLiked: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

const Users: Model<User> = mongoose.model<User>("User", userSchema);

export default Users;
