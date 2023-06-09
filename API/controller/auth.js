import User from "../model/User.js"
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";

export const register = async (req,res,next) => {
    try{
        //encrypt our passwords
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash

        })
        const myUser = await newUser.save()
         //jwt tokens and alike
         const token = Jwt.sign({id:myUser._id, isAdmin:myUser.isAdmin}, process.env.JWT)

         //filtering out other parameters
         const {password, isAdmin, ...otherDetails} = myUser._doc;
         res.
         cookie("access_token", token, {
             httpOnly:true,
         }).status(200).json({...otherDetails})
    }catch{
        res.status(500).send("wrong password")
    }
}

//login usre starts here
export const login = async (req,res,next) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(500).send("email doesnt exist")
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return res.status(500).send("wrong password")

        //jwt tokens and alike
        const token = Jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)

        //filtering out other parameters
        const {password, isAdmin, ...otherDetails} = user._doc;

        res.
        cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json({...otherDetails})
    }catch{
        res.status(500).send("wrong password")
    }
}
//loginuser ends here