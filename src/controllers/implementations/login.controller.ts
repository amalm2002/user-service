
import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IAuthService } from '../../services/interfaces/auth.service.interface';
import { IBcryptService } from '../../services/interfaces/bcrypt.service.interface';
import { ILoginController } from '../interfaces/login.controller.interface';
import { CheckLoginDto } from '../../dto/login/check-login.dto';
import { GoogleSignInDto } from '../../dto/login/google-signin.dto';
import { ForgotPasswordDto } from '../../dto/login/forgot-password.dto';
import { VerifyOtpDto } from '../../dto/login/verify-otp.dto';
import { ResetPasswordDto } from '../../dto/login/reset-password.dto';
import { sendOtp } from '../../utilities/otp-sending.util';

export class LoginController implements ILoginController {
  private userRepository: IUserRepository;
  private authService: IAuthService;
  private bcryptService: IBcryptService;

  constructor(userRepository: IUserRepository, authService: IAuthService, bcryptService: IBcryptService) {
    this.userRepository = userRepository;
    this.authService = authService;
    this.bcryptService = bcryptService;
  }

  async checkLoginUser(call: any, callback: any): Promise<void> {
    const { email, password } = call.request as CheckLoginDto;
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        callback(null, { message: 'No user found' });
        return;
      }
      const isPasswordValid = await this.bcryptService.matchPassword(password, user.password);
      if (!isPasswordValid) {
        callback(null, { message: 'Invalid password' });
        return;
      }      
      const role = user.isAdmin ? 'Admin' : 'User';
      const token = await this.authService.createToken(user._id.toString(), '15m', role);
      const refreshToken = await this.authService.createToken(user._id.toString(), '7d', role);
      callback(null, {
        message: 'Success',
        name: user.name,
        token,
        refreshToken,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        _id: user._id.toString(),
        role
      });
    } catch (error) {
      console.log('Error in checkLoginUser:', error);
      callback(null, { error: (error as Error).message });
    }
  }

  async checkGoogleSignInUser(call: any, callback: any): Promise<void> {
    const { email } = call.request as GoogleSignInDto;
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        callback(null, { message: 'No user found' });
        return;
      }
      const role = user.isAdmin ? 'Admin' : 'User';
      const token = await this.authService.createToken(user._id.toString(), '15m', role);
      const refreshToken = await this.authService.createToken(user._id.toString(), '7d', role);
      callback(null, {
        message: 'Success',
        name: user.name,
        token,
        refreshToken,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        role
      });
    } catch (error) {
      console.log('Error in checkGoogleSignInUser:', error);
      callback({ code: 401, message: (error as Error).message }, null);
    }
  }

  async forgotPasswordUser(call: any, callback: any): Promise<void> {
    const { email } = call.request as ForgotPasswordDto;
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        callback(null, { message: 'No user found' });
        return;
      }
      const name = user.name || 'User';
      const token = await sendOtp(email, name);
      callback(null, { message: 'user exist', token });
    } catch (error) {
      console.error('Error in forgotPasswordUser:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during forgotPasswordUser'
      });
    }
  }

  async verifyOtp(call: any, callback: any): Promise<void> {
    const { email, otp, token } = call.request as VerifyOtpDto;
    try {
      const jwtOtp: any = this.authService.verifyOption(token);
      if (otp === jwtOtp?.clientId) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
          callback(null, { message: 'No user found' });
          return;
        }
        callback(null, { message: 'OTP verified' });
      } else {
        callback(null, { message: 'Invalid otp' });
      }
    } catch (error) {
      console.error('Error in verifyOtp:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during OTP verification'
      });
    }
  }

  async resetPassword(call: any, callback: any): Promise<void> {
    const { email, password, token } = call.request as ResetPasswordDto;
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      await this.userRepository.updateUserPassword(email, password);
      callback(null, { message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error in resetPassword:', error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during password reset'
      });
    }
  }
}