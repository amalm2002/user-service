
import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IProfileController } from '../interfaces/profile.controller.interface';
import { FindUserDto } from '../../dto/profile/find-user.dto';
import { UpdateProfileDto } from '../../dto/profile/update-profile.dto';
import { UpdateAddressDto } from '../../dto/profile/update-address.dto';
import { DeleteAddressDto } from '../../dto/profile/delete-address.dto';

export class ProfileController implements IProfileController {

  constructor(
    private readonly _userRepository: IUserRepository
  ) { }

  async findUserByTheirId(call: any, callback: any): Promise<void> {
    const { id } = call.request as FindUserDto;
    try {
      const response = await this._userRepository.findUserById(id);
      if (!response) {
        callback(null, { message: 'No User Found', isAdmin: false });
        return;
      }
      callback(null, {
        message: 'Success',
        isAdmin: response.isAdmin,
        user: {
          id: response._id.toString(),
          name: response.name,
          email: response.email,
          phone: response.phone,
          isActive: response.isActive,
          address: Array.isArray(response.address)
            ? response.address.map((addr: any) => ({
              city: addr.city,
              pinCode: addr.pinCode,
              state: addr.state,
              street: addr.street
            }))
            : [],
          isAdmin: response.isAdmin
        }
      });
    } catch (error) {
      console.log('Error in profile controller findUserByTheirId:', error);
      callback(new Error((error as Error).message));
    }
  }

  async editProfile(call: any, callback: any): Promise<void> {
    const { id, name, phone } = call.request as UpdateProfileDto;
    try {
      const nameRegex = /^[A-Za-z]{4,}$/;
      const phoneRegex = /^[1-9][0-9]{9}$/;
      if (!name || !nameRegex.test(name)) {
        throw new Error('Name must be more than 3 letters, contain only letters, and have no spaces.');
      }
      if (!phone || !phoneRegex.test(phone)) {
        throw new Error('Phone number must be exactly 10 digits, not start with 0, and not be all zeros.');
      }
      const response = await this._userRepository.updateUser(id, { name, phone });
      if (!response) {
        throw new Error('Failed to update user');
      }
      callback(null, {
        message: 'Success',
        isAdmin: response.isAdmin,
        user: {
          id: response._id.toString(),
          name: response.name,
          email: response.email,
          phone: response.phone,
          isActive: response.isActive,
          address: Array.isArray(response.address)
            ? response.address.map((addr: any) => ({
              city: addr.city,
              pinCode: addr.pinCode,
              state: addr.state,
              street: addr.street
            }))
            : [],
          isAdmin: response.isAdmin
        }
      });
    } catch (error) {
      console.log('Error in profile controller editProfile:', error);
      callback(new Error((error as Error).message));
    }
  }

  async addNewAddress(call: any, callback: any): Promise<void> {
    const { userId, address, index } = call.request as UpdateAddressDto;
    try {
      let updatedAddress;
      if (index === -1) {
        updatedAddress = await this._userRepository.addAddress(userId, address);
      } else {
        updatedAddress = await this._userRepository.updateAddress(userId, index, address);
      }
      callback(null, {
        message: 'Success',
        address: {
          city: updatedAddress.city,
          pinCode: updatedAddress.pinCode,
          state: updatedAddress.state,
          street: updatedAddress.street
        }
      });
    } catch (error) {
      console.log('Error in profile controller addNewAddress:', error);
      callback(new Error((error as Error).message));
    }
  }

  async deleteUserAddress(call: any, callback: any): Promise<void> {
    const { id, index } = call.request as DeleteAddressDto;
    try {
      const response = await this._userRepository.deleteAddressByIndex(id, index);
      callback(null, { success: true, message: 'Address deleted successfully' });
    } catch (error) {
      console.error('Error in deleteUserAddress:', error);
      callback(new Error((error as Error).message));
    }
  }
}