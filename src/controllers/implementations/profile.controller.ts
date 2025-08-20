import { IProfileController } from '../interfaces/profile.controller.interface';
import { IProfileService } from '../../services/interfaces/profile.service.interface';
import { FindUserDto } from '../../dto/profile/find-user.dto';
import { UpdateProfileDto } from '../../dto/profile/update-profile.dto';
import { UpdateAddressDto } from '../../dto/profile/update-address.dto';
import { DeleteAddressDto } from '../../dto/profile/delete-address.dto';

export class ProfileController implements IProfileController {

  constructor(
    private readonly _userService: IProfileService
  ) { }

  async findUserByTheirId(call: any, callback: any): Promise<void> {
    try {
      const response = await this._userService.findUserByTheirId(call.request as FindUserDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in profile controller findUserByTheirId:', error);
      callback(new Error((error as Error).message));
    }
  }

  async editProfile(call: any, callback: any): Promise<void> {
    try {
      const response = await this._userService.editProfile(call.request as UpdateProfileDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in profile controller editProfile:', error);
      callback(new Error((error as Error).message));
    }
  }

  async addNewAddress(call: any, callback: any): Promise<void> {
    try {
      const response = await this._userService.addNewAddress(call.request as UpdateAddressDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in profile controller addNewAddress:', error);
      callback(new Error((error as Error).message));
    }
  }

  async deleteUserAddress(call: any, callback: any): Promise<void> {
    try {
      const response = await this._userService.deleteUserAddress(call.request as DeleteAddressDto);
      callback(null, response);
    } catch (error) {
      console.error('Error in profile controller deleteUserAddress:', error);
      callback(new Error((error as Error).message));
    }
  }
}
