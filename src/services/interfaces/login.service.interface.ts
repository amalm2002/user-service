import { CheckLoginDto, CheckLoginResponseDTO } from '../../dto/login/check-login.dto';
import { GoogleSignInDto } from '../../dto/login/google-signin.dto';
import { ForgotPasswordDto, ForgotPasswordResponseDTO } from '../../dto/login/forgot-password.dto';
import { VerifyOtpDto, VerifyOtpResponseDTO } from '../../dto/login/verify-otp.dto';
import { ResetPasswordDto, ResetPasswordResponseDTO } from '../../dto/login/reset-password.dto';

export interface ILoginService {
  checkLoginUser(data: CheckLoginDto): Promise<CheckLoginResponseDTO>;
  checkGoogleSignInUser(data: GoogleSignInDto): Promise<CheckLoginResponseDTO>;
  forgotPasswordUser(data: ForgotPasswordDto): Promise<ForgotPasswordResponseDTO>;
  verifyOtp(data: VerifyOtpDto): Promise<VerifyOtpResponseDTO>;
  resetPassword(data: ResetPasswordDto): Promise<ResetPasswordResponseDTO>;
}
