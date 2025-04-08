import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

export const sendMail=async(email:string,subject:string,text:string)=>{
    try {
        console.log("==========", process.env.NODEMAILER_EMAIL,process.env.NODEMAILER_PASS);
        
        const transaction=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS,
            }
        })

        const mailOptions={
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: subject,
            text: text,
        }

        await transaction.sendMail(mailOptions)
    } catch (error) {
        console.log("sendmail funtion",error);
        
        throw new Error((error as Error).message)
    }
}