import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
},{timestamps:true});

export default mongoose.model("User", UserScheme)