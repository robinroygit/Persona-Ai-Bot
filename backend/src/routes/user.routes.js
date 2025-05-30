import { Router } from "express";
import { podcastChatBot } from "../controllers/user.controller.js";



const router = Router();


// router.route("/").get((req,res)=>{
//     res.json({testing:"testing"});
// })


router.route("/chat-bot").post(podcastChatBot)



export default router;
