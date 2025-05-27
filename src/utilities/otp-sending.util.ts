import { AuthService } from '../services/implementations/auth.service';
import { GenerateOtpService } from '../services/implementations/generate-otp.service';
import { NodemailerService } from '../services/implementations/nodemailer.service';

const auth = new AuthService();
const generateOtpService = new GenerateOtpService();
const nodemailerService = new NodemailerService();

export const sendOtp = async (email: string, name: string): Promise<string> => {
  try {
    const otp = generateOtpService.generateOTP();
    console.log('Generated OTP:', otp);
    const token = await auth.createToken(otp, '2d', 'Otp');
    const subject = 'Otp Verification';
    const text = `Hello ${name},\n\nThank you for registering with Food Booking!, your OTP is ${otp}\n\nHave a nice day!!!`;
    await nodemailerService.sendMail(email, subject, text);
    console.log('OTP and token:', otp, token);
    return token;
  } catch (error) {
    console.log('sendOtp function', error);
    throw new Error((error as Error).message);
  }
};