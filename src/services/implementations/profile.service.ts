import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IProfileService } from '../interfaces/profile.service.interface';
import { FindUserDto } from '../../dto/profile/find-user.dto';
import { UpdateProfileDto, UpdateProfileResponseDTO } from '../../dto/profile/update-profile.dto';
import { UpdateAddressDto, UpdateAddressResponseDTO } from '../../dto/profile/update-address.dto';
import { DeleteAddressDto, DeleteAddressResponseDTO } from '../../dto/profile/delete-address.dto';

export class ProfileService implements IProfileService {

    constructor(
        private readonly _userRepository: IUserRepository
    ) { }

    async findUserByTheirId(findUserRequest: FindUserDto): Promise<UpdateProfileResponseDTO> {
        const response = await this._userRepository.findUserById(findUserRequest.id);
        if (!response) {
            return { message: 'No User Found', isAdmin: false };
        }
        return {
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
        };
    }

    async editProfile(profileUpdateRequest: UpdateProfileDto): Promise<UpdateProfileResponseDTO> {
        const { id, name, phone } = profileUpdateRequest;

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

        return {
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
        };
    }

    async addNewAddress(addressAddRequest: UpdateAddressDto): Promise<UpdateAddressResponseDTO> {
        const { userId, address, index } = addressAddRequest;
        let updatedAddress;
        if (index === -1) {
            updatedAddress = await this._userRepository.addAddress(userId, address);
        } else {
            updatedAddress = await this._userRepository.updateAddress(userId, index, address);
        }
        return {
            message: 'Success',
            address: {
                city: updatedAddress.city,
                pinCode: updatedAddress.pinCode,
                state: updatedAddress.state,
                street: updatedAddress.street
            }
        };
    }

    async deleteUserAddress(addressDeleteRequest: DeleteAddressDto): Promise<DeleteAddressResponseDTO> {
        await this._userRepository.deleteAddressByIndex(addressDeleteRequest.id, addressDeleteRequest.index);
        return { success: true, message: 'Address deleted successfully' };
    }
}
