import { Router } from "express";
import { getMessage, postMessage } from "../controller/message.js";



const router = Router()

router.post("/", postMessage)
router.get("/:convoid", getMessage)



export default router