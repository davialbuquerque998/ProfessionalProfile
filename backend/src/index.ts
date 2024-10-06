import express, { Request, Response, NextFunction, text } from "express";
import cors from "cors";
import morgan from "morgan";

import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import emailSender from "./mail/sendMailer";
dotenv.config();

const app = express();
const PORT: number = parseInt(`${process.env.PORT}`) || 3000;


const TO_ADDRESS:string = `${process.env.TO_ADDRESS}`;

app.use(cors({origin: ["http://127.0.0.1:5500/","https://davialbuquerque998.github.io", "https://professionalprofileserver.onrender.com"]}));
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ hello: "world" });
  return;
});

app.post("/contact", [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
], async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
        return;
    }

    const {name, email, subject, message} = req.body;

    try {
        await emailSender(name, email, TO_ADDRESS, subject, message);
        console.log("It works");
        res.status(200).send("It worked");
        return;
    } catch (error) {
        console.log("It did not work");
        res.status(200).send("It should work, but it did not");
        return;
    }
    
    
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
