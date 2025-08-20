import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IAuthService } from '../interfaces/auth.service.interface';
import { IBcryptService } from '../interfaces/bcrypt.service.interface';
import { ILoginService } from '../interfaces/login.service.interface';
import { CheckLoginDto, CheckLoginResponseDTO } from '../../dto/login/check-login.dto';
import { GoogleSignInDto } from '../../dto/login/google-signin.dto';
import { ForgotPasswordDto, ForgotPasswordResponseDTO } from '../../dto/login/forgot-password.dto';
import { VerifyOtpDto, VerifyOtpResponseDTO } from '../../dto/login/verify-otp.dto';
import { ResetPasswordDto, ResetPasswordResponseDTO } from '../../dto/login/reset-password.dto';
import { sendOtp } from '../../utilities/otp-sending.util';

export class LoginService implements ILoginService {
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _authService: IAuthService,
        private readonly _bcryptService: IBcryptService
    ) { }

    async checkLoginUser(data: CheckLoginDto): Promise<CheckLoginResponseDTO> {
        const { email, password } = data;
        const user = await this._userRepository.findUserByEmail(email);
        if (!user) {
            return { message: 'No user found' };
        }
        const isPasswordValid = await this._bcryptService.matchPassword(password, user.password);
        if (!isPasswordValid) {
            return { message: 'Invalid password' };
        }

        const role = user.isAdmin ? 'Admin' : 'User';
        const token = await this._authService.createToken(user._id.toString(), '15m', role);
        const refreshToken = await this._authService.createToken(user._id.toString(), '7d', role);

        return {
            message: 'Success',
            name: user.name,
            token,
            refreshToken,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            _id: user._id.toString(),
            role
        };
    }

    async checkGoogleSignInUser(data: GoogleSignInDto): Promise<CheckLoginResponseDTO> {
        const { email } = data;
        const user = await this._userRepository.findUserByEmail(email);
        if (!user) {
            return { message: 'No user found' };
        }

        const role = user.isAdmin ? 'Admin' : 'User';
        const token = await this._authService.createToken(user._id.toString(), '15m', role);
        const refreshToken = await this._authService.createToken(user._id.toString(), '7d', role);

        return {
            message: 'Success',
            name: user.name,
            token,
            refreshToken,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            role
        };
    }

    async forgotPasswordUser(data: ForgotPasswordDto): Promise<ForgotPasswordResponseDTO> {
        const { email } = data;
        const user = await this._userRepository.findUserByEmail(email);
        if (!user) {
            return { message: 'No user found' };
        }

        const name = user.name || 'User';
        const token = await sendOtp(email, name);

        return { message: 'user exist', token };
    }

    async verifyOtp(data: VerifyOtpDto): Promise<VerifyOtpResponseDTO> {
        const { email, otp, token } = data;
        const jwtOtp: any = this._authService.verifyOption(token);

        if (otp === jwtOtp?.clientId) {
            const user = await this._userRepository.findUserByEmail(email);
            if (!user) {
                return { message: 'No user found' };
            }
            return { message: 'OTP verified' };
        } else {
            return { message: 'Invalid otp' };
        }
    }

    async resetPassword(data: ResetPasswordDto): Promise<ResetPasswordResponseDTO> {
        const { email, password } = data;
        const user = await this._userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        await this._userRepository.updateUserPassword(email, password);
        return { message: 'Password reset successfully' };
    }
}
