import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const SMTP_SERVER:string = `${process.env.SMTP_SERVER}`;
const SMTP_PORT:number = parseInt(`${process.env.SMTP_PORT}`);
const SMTP_USERNAME:string = `${process.env.SMTP_USERNAME}`;
const SMTP_PASSWORD:string = `${process.env.SMTP_PASSWORD}`;

export default async function emailSender(name:string, email:string, to:string, subject:string, message:string) {
    const smtpTransport = nodemailer.createTransport({
        host:SMTP_SERVER,
        port:SMTP_PORT,
        secure:true,
        auth:{
            user:SMTP_USERNAME,
            pass:SMTP_PASSWORD
        },
        logger:true,
        debug:true
    });

    const mailOptions = {
        from: SMTP_USERNAME,
        to,
        subject,
        html:`${name}<br/>${email}<br/>${message}`
    };

    try {
        await smtpTransport.sendMail(mailOptions);
        console.log("Email was sent");
    } catch (error) {
        console.error(error);
        throw error;
    }

}