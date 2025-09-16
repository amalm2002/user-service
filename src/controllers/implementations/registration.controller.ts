import { IRegistrationController } from '../interfaces/registartion.controller.interface';
import { IRegistrationService } from '../../services/interfaces/registration.service.interface';
import { CreateUserDto } from '../../dto/registration/create-user.dto';
import { CheckUserDto } from '../../dto/registration/check-user.dto';
import { ResendOtpDto } from '../../dto/registration/resend-otp.dto';

export class RegistrationController implements IRegistrationController {
  constructor(private readonly _registrationService: IRegistrationService) {}

  // async signup(call: any, callback: any): Promise<void> {
  //   try {     
  //     const response = await this._registrationService.signup(call.request as CreateUserDto);
  //     callback(null, response);
  //   } catch (error) {
  //     console.error('Signup error:', error);
  //     callback(500, { error: (error as Error).message });
  //   }
  // }

  async signup(call: any, callback: any): Promise<void> {
  try {
    console.log("📥 [UserService] Signup request:", call.request);
    const response = await this._registrationService.signup(call.request);
    console.log("📤 [UserService] Signup response:", response);

    callback(null, response);
  } catch (error) {
    console.error("❌ [UserService] Signup error:", error);
    callback(500, { error: (error as Error).message });
  }
}


  async checkUser(call: any, callback: any): Promise<void> {
    try {
      const response = await this._registrationService.checkUser(call.request as CheckUserDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in checkUser:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during checkUser'
      });
    }
  }

  async resendOtp(call: any, callback: any): Promise<void> {
    try {
      const response = await this._registrationService.resendOtp(call.request as ResendOtpDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in resendOtp:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during resend OTP section'
      });
    }
  }
}
