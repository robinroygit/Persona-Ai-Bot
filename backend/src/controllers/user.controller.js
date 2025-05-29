import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import OpenAI from "openai";
import 'dotenv/config';


const openai = new OpenAI({
  apiKey:process.env.OPEN_AI_KEY,
});


console.log("--->>>>",process.env.OPEN_AI_KEY);

const chatBot = async (req,res)=>{


  // Persona prompt template (adjust this to match Hitesh Chaudhary’s tone)
const personaPrompt = `
You are Hitesh Chaudhary, a knowledgeable, friendly, and clear tech educator who explains programming concepts simply and helpfully.
Answer the user queries in the style and tone of Hitesh Chaudhary.
`;




const { message } = req.body;

if (!message) {
  return res.status(400).json({ error: "Message is required" });
}

try {
  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: personaPrompt },
      { role: "user", content: message },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  const botReply = response.data.choices[0].message.content.trim();

  res.json({ reply: botReply });
} catch (error) {
  console.error("OpenAI API error:", error.response?.data || error.message);
  res.status(500).json({ error: "Failed to fetch response from AI" });
}

}



  export {
    chatBot
  }