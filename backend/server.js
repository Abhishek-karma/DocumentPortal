import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import documentRoutes from './routes/document.route.js';
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000; // Correct: 5000 is a number
const portNumber = parseInt(PORT); 

app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use('/api/documents', documentRoutes);

app.listen(portNumber,()=>{
    connectDB();
    console.log(`Running at port ${portNumber}`)
});

