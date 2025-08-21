import { CreateUserDto, CreateUserResponseDTO } from '../../dto/registration/create-user.dto';
import { CheckUserDto, CheckUserResponseDTO } from '../../dto/registration/check-user.dto';
import { ResendOtpDto, ResendOtpResponseDTO } from '../../dto/registration/resend-otp.dto';

export interface IRegistrationService {
  signup(userRegistrationRequest: CreateUserDto): Promise<CreateUserResponseDTO>;
  checkUser(userCheckRequest: CheckUserDto): Promise<CheckUserResponseDTO>;
  resendOtp(otpResendRequest: ResendOtpDto): Promise<ResendOtpResponseDTO>;
}
