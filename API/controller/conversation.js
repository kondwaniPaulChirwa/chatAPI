import Conversation from "../model/Conversation.js"


export const postConvo = async (req,res) => {
    const newConver = new Conversation({
        members: [req.body.senderid,req.body.receiverid],
        message: req.body.message
    })
    try{
        const savedConvo = await newConver.save()
        res.status(200).json(savedConvo)
    }catch(err){
        res.status(500).json(err)
    }
}

export const getConvo = async (req,res) => {
    try{
        const myConvo = await Conversation.find({
            members: {$in:[req.params.senderid]}
        })
        res.status(200).json(myConvo)
    }catch(err){
        res.status(500).json(err)
    }
}


export const convospecial = async (req,res) => {
    try{
        const user = await Conversation.findOne({
            members: {
              $all: [req.params.account1, req.params.account2],
            },
          });
            if (user && user.members.includes(req.params.account1) && user.members.includes(req.params.account2)) {
                res.status(200).json(user);
                } else {
                    try{
                        const user = await Conversation.findOne({
                            members: {
                              $all: [req.params.account2 && req.params.account1],
                            },
                          });
                          if (user && user.members.includes(req.params.account1) && user.members.includes(req.params.account2)) {
                            res.status(200).json(user);
                            }else{
                                res.status(200).json(null);
                            }

                    }catch(err){

                    }
                }
    }catch(err){
        res.status(500).json(err)
    }
}