import {AuthService} from "../services/auth";
import generateOTP from "../services/generateOtp";
import { sendMail } from "../services/nodeMailer";

const auth = new AuthService();

export const sendOtp=async(email:string,name:string)=>{
    try {
        const otp = generateOTP();  
        console.log('otppppppppppppppppppppppppp :',otp);
             
        const token = await auth.createToken(otp,'2d','Otp');        
        const subject = "Otp Verification";
        const text = `Hello ${name},\n\nThank you for registering with Food Booking !, your OTP is ${otp}\n\nHave a nice day!!!`;
        await sendMail(email, subject, text);
        console.log("otp, token",otp,token);
        return token
    } catch (error) {
        console.log("sendOtp fun",error);
    }
}