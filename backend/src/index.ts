import express, { Request, Response, NextFunction, text } from "express";
import cors from "cors";
import morgan from "morgan";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT: number = parseInt(`${process.env.PORT}`);
const FROM_EMAIL_ADDRESS:string = `${process.env.FROM_EMAIL_ADDRESS}`;
const EMAIL_PASSWORD:string = `${process.env.EMAIL_PASSWORD}`;

app.use(cors());
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
    // Create a nodemailer transporter (configure with your email service)

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:FROM_EMAIL_ADDRESS,
            pass:EMAIL_PASSWORD 
        }
    });

    const mailOptions = {
        from:FROM_EMAIL_ADDRESS,
        to:"davialbuquerque998@gmail.com",
        subject:subject,
        text:`Name:${name}\nEmail:${email}\nSubject:${subject}\nMessage:${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({message:"Email sent successfully"});
        return;
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
        return;
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
