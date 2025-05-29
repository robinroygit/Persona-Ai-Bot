import { Router } from "express";
import { chatBot } from "../controllers/user.controller.js";



const router = Router();


router.route("/").get((req,res)=>{
    res.json({testing:"testing"});
})


router.route("/chat-bot").post(chatBot)



export default router;
