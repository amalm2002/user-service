import User from '../../models/user.model';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { registration } from '../../models/interfaces/user.interface';
import { IBcryptService } from '../../services/interfaces/bcrypt.service.interface';
import { BcryptService } from '../../services/implementations/bcrypt.service';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<any> implements IUserRepository {
  private bcryptService: IBcryptService;

  constructor() {
    super(User);
    this.bcryptService = new BcryptService();
  }

  async saveUser(userData: registration) {
    try {
      const userCount = await User.countDocuments();
      const hashedPassword = await this.bcryptService.securePassword(userData.password);
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        isAdmin: userCount === 0,
        googleId: userData.googleId
      });
      const saveUser = await newUser.save();
      return saveUser;
    } catch (error) {
      console.log(error, 'userRepo');
      throw new Error((error as Error).message);
    }
  }

  async findUserById(userId: string) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log(error, 'findUserById Error');
      return null;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error, 'findUserByEmail Error');
      return null;
    }
  }

  async findAllUsers(status: boolean) {
    try {
      const allUsers = await User.find({ isAdmin: false });
      return allUsers;
    } catch (error) {
      console.log(error, 'error on findAllUsers');
      throw error;
    }
  }

  async findBlockUser(userId: string) {
    try {
      const blockUser = await User.findById(userId);
      if (!blockUser) {
        return { success: false, message: 'User Not Found' };
      }
      blockUser.isActive = !blockUser.isActive;
      await blockUser.save();
      const user_id = blockUser._id.toString();
      return {
        success: blockUser.isActive ? true : false,
        message: blockUser.isActive ? "User unblocked successfully" : "User blocked successfully",
        isActive: blockUser.isActive,
        userId: user_id
      };
    } catch (error) {
      console.log(error, "error on findBlockUser");
      return { success: false, message: "Error blocking user" };
    }
  }

  async updateUserPassword(email: string, password: string) {
    try {
      const hashedPassword = await this.bcryptService.securePassword(password);
      const user = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
      return user;
    } catch (error) {
      console.error('Error in updateUserPassword:', error);
      throw new Error('Failed to update password');
    }
  }

  async updateUser(userId: string, data: { name: string; phone: string }) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { name: data.name, phone: data.phone, updatedAt: new Date() },
        { new: true }
      );
      return user;
    } catch (error) {
      console.log('updateUser Error', error);
      return null;
    }
  }

  async addAddress(userId: string, address: any) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const isDuplicate = user.address?.some(
        (existingAddress) =>
          existingAddress.city === address.city &&
          existingAddress.pinCode === address.pinCode &&
          existingAddress.state === address.state &&
          existingAddress.street === address.street
      );
      if (isDuplicate) {
        throw new Error('Address already exists');
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { address } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error('Failed to add address');
      }
      return address;
    } catch (error) {
      console.log('addAddress Error', error);
      throw error;
    }
  }

  async updateAddress(userId: string, index: number, address: any) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (!user.address || index < 0 || index >= user.address.length) {
        throw new Error('Invalid address index');
      }
      const isDuplicate = user.address.some(
        (existingAddress, i) =>
          i !== index &&
          existingAddress.city === address.city &&
          existingAddress.pinCode === address.pinCode &&
          existingAddress.state === address.state &&
          existingAddress.street === address.street
      );
      if (isDuplicate) {
        throw new Error('Address already exists');
      }
      user.address[index] = address;
      await user.save();
      return address;
    } catch (error) {
      console.log('updateAddress Error', error);
      throw error;
    }
  }

  async deleteAddressByIndex(userId: string, addressIndex: number) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (addressIndex < 0 || addressIndex >= user.address.length) {
        throw new Error('Invalid address index');
      }
      user.address.splice(addressIndex, 1);
      user.markModified('address');
      await user.save();
      return { success: true, message: 'Address deleted successfully' };
    } catch (error) {
      console.log('deleteAddressByIndex Error', error);
      throw error;
    }
  }
}