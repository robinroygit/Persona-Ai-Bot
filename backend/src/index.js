import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js";
import { ApiError } from "./utils/ApiErrors.js";
import path from 'path';
import { fileURLToPath } from 'url';
// dotenv.config();
dotenv.config({path:"./.env"});


const app = express();

// Vite build folder setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("-->>",__filename)
console.log("-->>",__dirname)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// Serve the frontend
app.use(express.static(path.join(__dirname,'..','public/build/')));

app.use(express.static("public/build"))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public/build"))
app.use(cookieParser())

// Fallback for client-side routing
app.get('', (req, res) => {
        res.sendFile(path.join(__dirname,'..','public/build/index.html'));
  });
  
app.use("/api/v1/user",userRouter);



// Error-handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        // Use the `toJSON` method to return the error as JSON
        return res.status(err.statusCode).json(err.toJSON());
    }

    // For other errors, return a generic 500 error
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});




app.listen(process.env.PORT || 8000,()=>{
console.log("⚙️ Server running at port : ", process.env.PORT || 8000);

}); 