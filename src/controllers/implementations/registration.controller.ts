
import { IAuthService } from '../../services/interfaces/auth.service.interface';
import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IBcryptService } from '../../services/interfaces/bcrypt.service.interface';
import { IRegistrationController } from '../interfaces/registartion.controller.interface';
import { CreateUserDto } from '../../dto/registration/create-user.dto';
import { CheckUserDto } from '../../dto/registration/check-user.dto';
import { ResendOtpDto } from '../../dto/registration/resend-otp.dto';
import { sendOtp } from '../../utilities/otp-sending.util';

export class RegistrationController implements IRegistrationController {
  private authService: IAuthService;
  private userRepository: IUserRepository;
  private bcryptService: IBcryptService;

  constructor(authService: IAuthService, userRepository: IUserRepository, bcryptService: IBcryptService) {
    this.authService = authService;
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async signup(call: any, callback: any): Promise<void> {
    const { name, email, password, otp, token, googleId } = call.request as CreateUserDto;
    try {
      const jwtOtp: any = this.authService.verifyOption(token);
      if (otp === jwtOtp?.clientId) {
        const hashedPassword = await this.bcryptService.securePassword(password);
        const userData = { name, email, password: hashedPassword, googleId: googleId ?? null };
        const response = await this.userRepository.saveUser(userData);
        callback(null, { message: 'Success', isAdmin: response.isAdmin, isActive: response.isActive });
      } else {
        callback(null, { message: 'invalid otp' });
      }
    } catch (error) {
      console.log("Signup error:", error);
      callback(500, { error: (error as Error).message });
    }
  }

  async checkUser(call: any, callback: any): Promise<void> {
    const { email, name } = call.request as CheckUserDto;
    try {
      const response = await this.userRepository.findUserByEmail(email);
      if (!response) {
        const token = await sendOtp(email, name);
        callback(null, { token, message: 'user not registered' });
      } else {
        callback(null, { message: 'user already have an account !' });
      }
    } catch (error) {
      console.error("Error in checkUser:", error);
      callback({
        code: null,
        message: (error as Error).message || "Unknown error occurred during checkUser"
      });
    }
  }

  async resendOtp(call: any, callback: any): Promise<void> {
    const { email, name } = call.request as ResendOtpDto;
    try {
      const token = await sendOtp(email, name);
      callback(null, { token, message: 'Resend OTP sent to your mail' });
    } catch (error) {
      console.error("Error in resend OTP side:", error);
      callback({
        code: null,
        message: (error as Error).message || "Unknown error occurred during resend OTP section"
      });
    }
  }
}