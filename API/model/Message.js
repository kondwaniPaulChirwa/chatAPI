import mongoose from "mongoose";

const MessageScheme = new mongoose.Schema({
    conversationid: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    senderid: {
        type: String,
    }
},{timestamps:true});

export default mongoose.model("Message", MessageScheme)