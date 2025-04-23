import { AuthService } from "../services/auth";
import LoginUseCase from "../use-case/login.use-case";
import { sendOtp } from "../utils/otpSending";

export default class LoginController {

    private loginUseCase: LoginUseCase;
    private auth: AuthService

    constructor(loginUseCase: LoginUseCase, auth: AuthService) {
        this.loginUseCase = loginUseCase
        this.auth = auth
    }

    checkLoginUser = async (call: any, callback: any) => {
        // console.log('data get on the user service...', call.request);
        const { email, password } = call.request
        try {
            const response = await this.loginUseCase.checkLoginUser(email, password)
            // console.log('responseeeeeeeeeeeeeeeeeeeeeeeeee checkkkkkkkkkkkkkkkkkkkkkkkkkkk',response);
            callback(null, response)
        } catch (error) {
            console.log(error);
            callback(null, { error: (error as Error).message });
        }
    }

    checkGoogleSignInUser = async (call: any, callback: any) => {
        console.log('Google data received:', call.request);
        const { email } = call.request;
        try {
            const response = await this.loginUseCase.checkGoogleUser(email);
            console.log('Google sign-in response:', response);
            callback(null, response);
        } catch (error) {
            console.log('Error in Google sign-in check:', error);
            callback({ code: 401, message: (error as Error).message }, null);
        }
    };

    forgotPasswordUser = async (call: any, callback: any) => {
        console.log('ForgotPasswordUser request:', call.request);
        try {
            const { email } = call.request;

            const response = await this.loginUseCase.existingUser(email);
            const name = response?.name || 'User';

            if (response.message === 'user exist') {
                const token = await sendOtp(email, name);
                callback(null, { message: 'user exist', token });
            } else {
                callback(null, { message: response.message });
            }
        } catch (error) {
            console.error('Error in forgotPasswordUser:', error);
            callback({
                code: null,
                message: (error as Error).message || 'Unknown error occurred during forgotPasswordUser',
            });
        }
    };

    verifyOtp = async (call: any, callback: any) => {
        try {
            const { email, otp, token } = call.request

            const jwtOtp: any = this.auth.verifyOption(token)

            if (otp === jwtOtp?.clientId) {
                const response = await this.loginUseCase.verifyOtp(email)
                console.log('response verify-otp side :', response);
                callback(null, response)
            } else {
                callback(null, { message: 'Invalid otp' })
            }

        } catch (error) {
            console.error('Error in verifyOtp:', error);
            callback({
                code: null,
                message: (error as Error).message || 'Unknown error occurred during OTP verification',
            });
        }
    }

    resetPassword = async (call: any, callback: any) => {
        try {
            const { email, password, token } = call.request;
            console.log(email,password,token);
            
            const result = await this.loginUseCase.resetPassword(email, password, token);
            callback(null, { message: 'Password reset successfully' });
        } catch (error) {
            console.error('Error in resetPassword:', error);
            callback({
                code: null,
                message: (error as Error).message || 'Unknown error occurred during password reset',
            });
        }
    };
}