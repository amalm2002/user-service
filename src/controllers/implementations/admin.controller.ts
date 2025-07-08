
import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IAdminController } from '../interfaces/admin.controller.interface';
import { BlockUserDto } from '../../dto/admin/block-user.dto';

export class AdminController implements IAdminController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(call: any, callback: any): Promise<void> {
    try {
      const response = await this.userRepository.findAllUsers(true);
      const users = {
        users: response
      };
      callback(null, users);
    } catch (error) {
      console.log('Error in admin controller getAllUsers:', error);
      callback(null, { error: (error as Error).message });
    }
  }

  async blockUser(call: any, callback: any): Promise<void> {
    try {
      const { userId } = call.request as BlockUserDto;
      const response = await this.userRepository.findBlockUser(userId);
      // console.log('user side response :', response);

      response.success === true
        ? callback(null, { success: true, message: "User blocked successfully", isActive: response.isActive, userId: response.userId })
        : callback(null, { success: false, message: "User unblocked successfully", isActive: response.isActive, userId: response.userId });
    } catch (error) {
      console.log("Error in blockUser:", error);
      callback(null, { success: false, message: "Internal server error" });
    }
  }
}