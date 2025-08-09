import express from 'express'
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express()
const port = process.env.PORT||8000

app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true,               // Allow cookies/auth headers
}));

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

//routes
app.use("/api/auth",authRoutes)

app.use("/api/posts",postRoutes)

app.listen(port,()=>{
    connectDb()
    console.log(`Server started at`,port)
})