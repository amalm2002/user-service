import { response } from "express";
import { AuthService } from "../services/auth";
import RegistartionUseCase from "../use-case/registration.use-case";
import { sendOtp } from "../utils/otpSending";


export default class RegistrationController {
  private registartionUseCase: RegistartionUseCase;
  private auth: AuthService;

  constructor(auth: AuthService, registartionUseCase: RegistartionUseCase) {
    this.registartionUseCase = registartionUseCase;
    this.auth = auth;
  }

  signup = async (call: any, callback: any) => {
    const { name, email, password, otp, token, googleId } = call.request;

    // console.log("Signup request received:", call.request);

    const userData = { name, email, password, googleId: googleId ?? null };

    try {
      const jwtOtp: any = this.auth.verifyOption(token);

      console.log("OTP provided:", otp, "JWT OTP:", jwtOtp?.clientId);

      if (otp === jwtOtp?.clientId) {

        const response = await this.registartionUseCase.user_registration(userData);
        console.log("User registration response:", response);
        callback(null, response);

      } else {

        console.log("Invalid OTP");
        callback(null, { message: 'invalid otp' });

      }
    } catch (error) {

      console.log("Signup error:", error);
      callback(500, { error: (error as Error).message });
      
    }
  };

  checkUser = async (call: any, callback: any) => {
    const { email, name } = call.request;
    try {

      const response = await this.registartionUseCase.findUserByEmail(email);
      // console.log("User check response:", response);

      if (response.message === "user not registered") {
        const token = await sendOtp(email, name);
        console.log("Generated OTP token:", token);
        callback(null, { token, message: response.message });
      } else {
        callback(null, response);
      }
    } catch (error) {
      console.error("Error in checkUser:", error);
      callback({
        code: null,
        message: (error as Error).message || "Unknown error occurred during checkUser",
      });
    }
  };

  resendOtp = async (call: any, callback: any) => {
    console.log('user service side call request:', call.request);
    const { email, name } = call.request
    try {
      const token = await sendOtp(email, name)
      console.log("Generated resend OTP token:", token);
      callback(null, { token, message: 'Resend OTP send to your mail' })
    } catch (error) {
      console.error("Error in resend OTP side:", error);
      callback({
        code: null, message: (error as Error).message || "Unknown error occurred during resend OTP section"

      })
    }

  }
}