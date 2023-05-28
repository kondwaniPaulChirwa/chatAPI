import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import convoRoute from './routes/conversation.js'
import messageRoute from './routes/message.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import WebSocket, { WebSocketServer } from "ws";
import http from 'http'
import { Server } from "socket.io";




//declera app an express function
//declare dotenv
//declare middleware for json data
const app = express()
app.use(express.json())
dotenv.config()
//ends here
//app.use(Server)
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    },
})


//onst cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//
//websocket now
//const wss = new WebSocketServer({server})
//my websockets area please go away

let users = []
//function to check if userID && socket_id is already there
const addusers = (userid,socketid) => {
    !users.some((user)=> user.userid === userid) &&
    users.push({userid,socketid}) 
    
}
//function to remove users from users array
const remove = (socketId) => {
    users = users.filter((user) => user.socketid !== socketId)
}
//get users
const getUser = (senderId) => {
    return users.find((user) => user.userid === senderId)
}

//socket connectiomn
io.on("connection", (socket)=>{
    io.on('error', console.error);
    console.log("User Connected.")
    // io.emit("welcome MF")
    //get userid and socket_id
    socket.on("addUser", (userId)=>{
        addusers(userId,socket.id)
        io.emit("getusers", users)

    })

    //send and get message
    socket.on("sendMessage",({senderId,receiverid,text,createdAt})=>{
            const user = getUser(receiverid)
            // console.log(text)
            // console.log(senderId)
            // console.log(receiverid)
            // console.log(user)
            io.to(user?.socketid).emit("getMessage", {
                senderId,
                text,
                createdAt
            })
    })
    //handle typing
    socket.on("typing", ({senderid,receiverid,typing})=>{
        const user = getUser(receiverid)
        io.to(user?.socketid).emit("usertyping",{
            typing,
            senderid
        })
    })
    //disconnected
    socket.on("disconnect", ()=>{
        io.on('error', console.error);
        console.log("a client has disconnected")
        remove(socket.id)
        io.emit("getusers", users)
 
     })
})

  //
//my websockt area ends here

//connect to mongooose MongoDB
//mongoose.connect(process.env.MONGO).then(console.log("connected to mongo")).catch((err)=>{console.log(err)})
const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGO)
        console.log("Connected to MongDB")
    } catch (err){
        console.log(err)
    }
}
//checking if mongo is connected or not starts here
mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected")
})
//checking if mongo is connected or not ends here
//middleware cookie-passer
app.use(cookieParser())


//middlewarefor route
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/convo", convoRoute)
app.use("/api/message", messageRoute)


//my socket data////////////////////////////////////////////////////////



//connect to server
server.listen(8800, ()=>{
    connectDB()
    console.log("Server conected")
})
