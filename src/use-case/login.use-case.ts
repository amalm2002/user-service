import { UserInterface } from '../entities/user.interface'
import UserRepository from '../repositeries/userRepo'
import { AuthService } from '../services/auth'
import Bcrypt from '../services/bcrypt'
import bcrypt from 'bcryptjs'


export default class LoginUseCase {
    private userRepo: UserRepository;
    private auth: AuthService

    constructor(userRepo: UserRepository, authService: AuthService) {
        this.userRepo = userRepo
        this.auth = authService
    }

    private async handleLogin(user: UserInterface) {

        const role = user.isAdmin ? 'Admin' : 'User'
        const token = await this.auth.createToken(user._id.toString(), '1m', role)
        const refreshToken = await this.auth.createToken(user._id.toString(), '7d', role)

        // console.log('userSerive use-case login');
        // console.log('token ======= ', token);
        // console.log('refreshToken ======= ', refreshToken);


        return {
            message: 'Success',
            name: user.name,
            token: token,
            refreshToken: refreshToken,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            _id: user._id.toString(),
            role
        }
    }

    checkLoginUser = async (email: string, password: string) => {
        try {
            const user = (await this.userRepo.findUserByEmail(email)) as UserInterface

            if (!user) {
                return { message: 'No user found' }
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return { message: 'Invalid password' }
            }

            return this.handleLogin(user)

        } catch (error) {
            console.log('error on userservice login user side...', error);
            throw new Error((error as Error).message);
        }
    }


    checkGoogleUser = async (email: string) => {
        try {
            const user = await this.userRepo.findUserByEmail(email) as UserInterface;
            console.log(user, 'useeeeeeeer');

            if (!user) {
                // throw new Error('No user found. Please sign up.');
                return { message: 'No user found' }
            }

            return this.handleLogin(user);

        } catch (error) {
            console.log('Error in checkGoogleUser:', error);
            throw new Error((error as Error).message);
        }
    };

    existingUser = async (email: string) => {
        try {
            const user = await this.userRepo.findUserByEmail(email)

            if (!user) {
                return { message: 'No user found' }
            }
            return { email: user.email, name: user.name, message: 'user exist' }
        } catch (error) {
            console.log('error on userservice existing user side...', error);
            throw new Error((error as Error).message);
        }
    }

    verifyOtp = async (email: string) => {
        try {
            const user = await this.userRepo.findUserByEmail(email)
            if (!user) {
                return { message: 'No user found' };
            }
            return { message: 'OTP verified' };
        } catch (error) {
            console.log('error on userservice verifyOtp user side...', error);
            throw new Error((error as Error).message);
        }
    }

    resetPassword = async (email: string, password: string, token: string) => {
        try {
            const user = await this.userRepo.findUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const hashedPassword = await Bcrypt.securePassword(password);
            await this.userRepo.updateUserPassword(email, hashedPassword);
            return { message: 'Password reset successfully' };
        } catch (error) {
            console.error('Error in resetPassword:', error);
            throw new Error((error as Error).message);
        }
    };

}