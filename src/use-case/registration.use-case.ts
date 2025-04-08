import UserRepositery from "../repositeries/userRepo";
import bcrypt from '../services/bcrypt'
import { userData } from '../entities/user.interface'


export default class RegistartionUseCase {
    private userRepo: UserRepositery
    constructor(userRepo: UserRepositery) {
        this.userRepo = userRepo
    }

    user_registration = async (userData: userData) => {
        try {
            const { name, email, password, isActive } = userData;


            const existingUser = await this.userRepo.findUserByEmail(email);

            if (existingUser) {
                return { message: "User already exists", isAdmin: existingUser.isAdmin };
            }

            const hashedPassword = await bcrypt.securePassword(password);
            const newUserData = {
                name,
                email,
                password: hashedPassword,
            };
            const response = await this.userRepo.saveUser(newUserData);
            // console.log(response,'user_registration_use_case');


            if (typeof response !== "string" && response._id) {
                return { message: "Success", isAdmin: response.isAdmin, isActive: response.isActive };
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };


    findUserByEmail = async (email: string) => {
        try {
            const user = await this.userRepo.findUserByEmail(email);
            // console.log("user===", user);
            if (user) {
                return { message: "user already have an account !" };
            } else {
                return { message: "user not registered" };
            }
        } catch (error: unknown) {
            return { message: (error as Error).message };
        }
    };


}