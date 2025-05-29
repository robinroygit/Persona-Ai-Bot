import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey:process.env.OPEN_AI_KEY,
});



const chatBot = async (req,res)=>{

  

}



  export {
    chatBot
  }