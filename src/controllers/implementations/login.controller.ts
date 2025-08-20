import { ILoginController } from '../interfaces/login.controller.interface';
import { ILoginService } from '../../services/interfaces/login.service.interface';
import { CheckLoginDto } from '../../dto/login/check-login.dto';
import { GoogleSignInDto } from '../../dto/login/google-signin.dto';
import { ForgotPasswordDto } from '../../dto/login/forgot-password.dto';
import { VerifyOtpDto } from '../../dto/login/verify-otp.dto';
import { ResetPasswordDto } from '../../dto/login/reset-password.dto';

export class LoginController implements ILoginController {
  constructor(private readonly _loginService: ILoginService) { }

  async checkLoginUser(call: any, callback: any): Promise<void> {
    try {
      const response = await this._loginService.checkLoginUser(call.request as CheckLoginDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in checkLoginUser:', error);
      callback(null, { error: (error as Error).message });
    }
  }

  async checkGoogleSignInUser(call: any, callback: any): Promise<void> {
    try {
      const response = await this._loginService.checkGoogleSignInUser(call.request as GoogleSignInDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in checkGoogleSignInUser:', error);
      callback({ code: 401, message: (error as Error).message }, null);
    }
  }

  async forgotPasswordUser(call: any, callback: any): Promise<void> {
    try {
      const response = await this._loginService.forgotPasswordUser(call.request as ForgotPasswordDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in forgotPasswordUser:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during forgotPasswordUser'
      });
    }
  }

  async verifyOtp(call: any, callback: any): Promise<void> {
    try {
      const response = await this._loginService.verifyOtp(call.request as VerifyOtpDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in verifyOtp:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during OTP verification'
      });
    }
  }

  async resetPassword(call: any, callback: any): Promise<void> {
    try {
      const response = await this._loginService.resetPassword(call.request as ResetPasswordDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in resetPassword:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during password reset'
      });
    }
  }
}
