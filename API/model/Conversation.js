import mongoose from "mongoose";

const ConversationScheme = new mongoose.Schema({
    members: {
        type: Array,
        required: true
    },
    message: {
        type: String,
      },
},{timestamps:true});

export default mongoose.model("Conversation", ConversationScheme)