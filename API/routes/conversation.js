import { Router } from "express";
import { convospecial, getConvo, postConvo } from "../controller/conversation.js";


const router = Router()

router.post("/", postConvo)
router.get("/:senderid", getConvo)
router.get("/special/:account1/:account2", convospecial)



export default router