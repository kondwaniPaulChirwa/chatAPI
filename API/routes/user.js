import { Router } from "express";
import User from "../model/User.js";

const router = Router()

router.get("/:id", async (req,res) => {
    try{
    //savr user in database
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
    }catch(err){
        //res.status(200).json("hahaha")
    }
})
//get a user ends here

//get user from database on type
router.get("/live/:id", async (req,res) => {
    try{
    //savr user in database
    const usernames = await User.find({
        username: {
          $regex: `.*${req.params.id}.*`,
          $options: 'i',
        },
      });
    res.status(200).json(usernames)
    }catch(err){
      res.status(200).json("hhhyu")
    }
})
//get a user ends here



export default router