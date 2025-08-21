import { CheckLoginDto, CheckLoginResponseDTO } from '../../dto/login/check-login.dto';
import { GoogleSignInDto } from '../../dto/login/google-signin.dto';
import { ForgotPasswordDto, ForgotPasswordResponseDTO } from '../../dto/login/forgot-password.dto';
import { VerifyOtpDto, VerifyOtpResponseDTO } from '../../dto/login/verify-otp.dto';
import { ResetPasswordDto, ResetPasswordResponseDTO } from '../../dto/login/reset-password.dto';

export interface ILoginService {
  checkLoginUser(loginUser: CheckLoginDto): Promise<CheckLoginResponseDTO>;
  checkGoogleSignInUser(googleSignIn: GoogleSignInDto): Promise<CheckLoginResponseDTO>;
  forgotPasswordUser(userForgotPassword: ForgotPasswordDto): Promise<ForgotPasswordResponseDTO>;
  verifyOtp(verify: VerifyOtpDto): Promise<VerifyOtpResponseDTO>;
  resetPassword(resetPasswordRequest: ResetPasswordDto): Promise<ResetPasswordResponseDTO>;
}
