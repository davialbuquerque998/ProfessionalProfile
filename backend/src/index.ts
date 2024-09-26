import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import morgan from "morgan";
import nodemailer from "nodemailer";
import {body, validationResult} from "express-validator";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT:number = parseInt(`${process.env.PORT}`);

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({hello:"world"});
    return;
});

app.listen(PORT, ()=>{
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});