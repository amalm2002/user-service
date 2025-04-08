import { UserInterface } from '../entities/user.interface'
import UserRepository from '../repositeries/userRepo'
import { AuthService } from '../services/auth'
import bcrypt from 'bcryptjs'


export default class LoginUseCase {
    private userRepo: UserRepository;
    private auth: AuthService

    constructor(userRepo: UserRepository, authService: AuthService) {
        this.userRepo = userRepo
        this.auth = authService
    }

    private async handleLogin(user: UserInterface) {

        const token = await this.auth.createToken(user._id.toString(), '15m')
        const refreshToken = await this.auth.createToken(user._id.toString(), '7d')

        // console.log('userSerive use-case login');
        // console.log('token ======= ', token);
        // console.log('refreshToken ======= ', refreshToken);


        return {
            message: 'Success',
            name: user.name,
            token: token,
            _id: user._id,
            refreshToken: refreshToken,
            isAdmin:user.isAdmin,
            isActive:user.isActive
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
            
            if (!user) {
                // throw new Error('No user found. Please sign up.');
                return {message:'No user found'}
            }
    
            return this.handleLogin(user);
    
        } catch (error) {
            console.log('Error in checkGoogleUser:', error);
            throw new Error(( error as Error).message);
        }
    };
    
}