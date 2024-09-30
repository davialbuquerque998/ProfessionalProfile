import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const SMTP_SERVER:string = `${process.env.SMTP_SERVER}`;
const SMTP_PORT:number = parseInt(`${process.env.SMTP_PORT}`);
const SMTP_USERNAME:string = `${process.env.SMTP_USERNAME}`;
const SMTP_PASSWORD:string = `${process.env.SMTP_PASSWORD}`;

/**
 * 
 * const nodemailer = require("nodemailer");

async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "davialbuquerque998@gmail.com",
        pass: "iltg kdms nqid knme",
      },
    });
    const mailOptions = {
      from: "davialbuquerque998@gmail.com",
      to: "davialbuquerque998@gmail.com",
      subject: "Hello from Nodemailer",
      text: "This is a test email sent using Nodemailer.",
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error: ", error);
  }
}

sendEmail();
 */
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