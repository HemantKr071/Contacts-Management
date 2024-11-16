import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import mainRoutes from './routes/clientRoutes.js'
//import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
const app = express();

const connect = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB")
    } catch (error){
        throw error;
    }
};
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
})
app.use(cors());
//app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/",mainRoutes);


app.listen(3000,()=> {
    connect();
    console.log("App is listening on port 3000");
})