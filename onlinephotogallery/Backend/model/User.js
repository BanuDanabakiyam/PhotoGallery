import mongoose, { version } from "mongoose";
const userScheme = mongoose.Schema({
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
        default: Date.now()
      },
      isLiked: {
        type: Boolean,
        default: false
      }
},{versionKey:false});
const Users = mongoose.model("user",userScheme);
export default Users;