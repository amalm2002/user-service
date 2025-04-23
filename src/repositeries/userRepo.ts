import User from '../entities/user.model'
import { registration } from '../entities/user.interface'


export default class userRepository {
    saveUser = async (userData: registration) => {
        try {
            const userCount = await User.countDocuments()
            const newUser = new User({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                isAdmin: userCount === 0,
            })

            const saveUser = await newUser.save()
            return saveUser

        } catch (error) {
            console.log(error, 'userRepo');
            return (error as Error).message
        }
    }

    findUserByEmail = async (email: string) => {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            console.log(error, 'findUserByEmail Error');
            return null;
        }
    }

    findAllUsers = async (status: boolean) => {
        try {
            const allUser = await User.find({ isAdmin: false })

            return allUser

        } catch (error) {
            console.log(error, 'error on findAllUsers');

        }
    }

    findBlockUser = async (userId: string) => {
        try {
            const blockUser = await User.findById(userId)
            if (!blockUser) {
                return { success: false, message: 'User Not Found' }
            }

            blockUser.isActive = !blockUser.isActive
            await blockUser.save()

            return {
                success: blockUser.isActive ? true : false,
                message: blockUser.isActive ? "User unblocked successfully" : "User blocked successfully",
            };

        } catch (error) {
            console.log(error, "error on findBlockUser");
            return { success: false, message: "Error blocking user" };
        }
    }

    updateUserPassword = async (email: string, password: string) => {
        try {
            const user = await User.findOneAndUpdate({ email }, { password }, { new: true });         
            return user;
        } catch (error) {
            console.error('Error in updateUserPassword:', error);
            throw new Error('Failed to update password');
        }
    };


}