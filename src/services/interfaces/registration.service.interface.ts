import { CreateUserDto, CreateUserResponseDTO } from '../../dto/registration/create-user.dto';
import { CheckUserDto, CheckUserResponseDTO } from '../../dto/registration/check-user.dto';
import { ResendOtpDto, ResendOtpResponseDTO } from '../../dto/registration/resend-otp.dto';

export interface IRegistrationService {
  signup(data: CreateUserDto): Promise<CreateUserResponseDTO>;
  checkUser(data: CheckUserDto): Promise<CheckUserResponseDTO>;
  resendOtp(data: ResendOtpDto): Promise<ResendOtpResponseDTO>;
}
