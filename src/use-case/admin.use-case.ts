import { status } from "@grpc/grpc-js";
import userRepository from "../repositeries/userRepo";


const userRepo = new userRepository()

export default class AdminUseCase {
    getUserData = async (status: boolean) => {
        try {
            const response = await userRepo.findAllUsers(status)
            return response

        } catch (error) {
            console.log('error on admin use case getUserdata side :', (error as Error));
        }
    }


    getBlockUser = async (userId: string) => {
        try {
            const response=await userRepo.findBlockUser(userId);
            // console.log('admin-use-case block user side :',response);
            return response
        } catch (error) {
            console.log("Error in getBlockUser:", error);
            return { success: false, message: "Internal server error" };
        }
    };


}