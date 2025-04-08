import AdminUseCase from "../use-case/admin.use-case";

const adminUseCase = new AdminUseCase()

export default class AdminController {
    getAllUsers = async (call: any, callback: any) => {
        try {
            const response = await adminUseCase.getUserData(true)
            const users = {
                users: response
            };
            callback(null, users)
        } catch (error) {
            console.log('error on admin controller userservice :', error);
            callback(null, { error: (error as Error).message })
        }
    }

    blockUser = async (call: any, callback: any) => {
        try {
            const userId = call.request.userId;
            const response = await adminUseCase.getBlockUser(userId);
            response.success ? callback(null, { success: true, message: "User blocked successfully" }) :
            callback(null, { success: false, message: "User unblocked successfully" });
        } catch (error) {
            console.log("Error in blockUser:", error);
            callback(null, { success: false, message: "Internal server error" });
        }
    };
}