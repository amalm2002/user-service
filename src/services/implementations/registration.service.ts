import { IAuthService } from '../interfaces/auth.service.interface';
import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IBcryptService } from '../interfaces/bcrypt.service.interface';
import { IRegistrationService } from '../interfaces/registration.service.interface';
import { CreateUserDto, CreateUserResponseDTO } from '../../dto/registration/create-user.dto';
import { CheckUserDto, CheckUserResponseDTO } from '../../dto/registration/check-user.dto';
import { ResendOtpDto, ResendOtpResponseDTO } from '../../dto/registration/resend-otp.dto';
import { sendOtp } from '../../utilities/otp-sending.util';

export class RegistrationService implements IRegistrationService {
  constructor(
    private readonly _authService: IAuthService,
    private readonly _userRepository: IUserRepository,
    private readonly _bcryptService: IBcryptService
  ) { }

  async signup(userRegistrationRequest: CreateUserDto): Promise<CreateUserResponseDTO> {
    const { name, email, password, otp, token, googleId } = userRegistrationRequest;

    const jwtOtp: any = this._authService.verifyOption(token);
    if (otp === jwtOtp?.clientId) {
      const hashedPassword = await this._bcryptService.securePassword(password);
      const userData = { name, email, password: hashedPassword, googleId: googleId ?? null };
      const response = await this._userRepository.saveUser(userData);
      return { message: 'Success', isAdmin: response.isAdmin, isActive: response.isActive };
    } else {
      return { message: 'invalid otp' };
    }
  }

  async checkUser(userCheckRequest: CheckUserDto): Promise<CheckUserResponseDTO> {
    const { email, name } = userCheckRequest;
    const response = await this._userRepository.findUserByEmail(email);
    if (!response) {
      const token = await sendOtp(email, name);
      return { token, message: 'user not registered' };
    } else {
      return { message: 'user already have an account !' };
    }
  }

  async resendOtp(otpResendRequest: ResendOtpDto): Promise<ResendOtpResponseDTO> {
    const { email, name } = otpResendRequest;
    const token = await sendOtp(email, name);
    return { token, message: 'Resend OTP sent to your mail' };
  }
}
