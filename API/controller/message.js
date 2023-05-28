import Message from "../model/Message.js"

//POST MESSAGE
export const postMessage = async (req,res) => {
    const newMessage = new Message(req.body)
    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(err){
        res.status(500).json(err)
    }
}

//GET MESSAGE
export const getMessage = async (req,res) => {
    try{
        const myMessage = await Message.find({
            conversationid: req.params.convoid,
        })
        res.status(200).json(myMessage)
    }catch(err){
        res.status(500).json(err)
    }
}