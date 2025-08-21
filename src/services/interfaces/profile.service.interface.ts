import { FindUserDto } from '../../dto/profile/find-user.dto';
import { UpdateProfileDto,UpdateProfileResponseDTO } from '../../dto/profile/update-profile.dto';
import { UpdateAddressDto ,UpdateAddressResponseDTO} from '../../dto/profile/update-address.dto';
import { DeleteAddressDto ,DeleteAddressResponseDTO} from '../../dto/profile/delete-address.dto';

export interface IProfileService {
  findUserByTheirId(findUserRequest: FindUserDto): Promise<UpdateProfileResponseDTO>;
  editProfile(profileUpdateRequest: UpdateProfileDto): Promise<UpdateProfileResponseDTO>;
  addNewAddress(addressAddRequest: UpdateAddressDto): Promise<UpdateAddressResponseDTO>;
  deleteUserAddress(addressDeleteRequest: DeleteAddressDto): Promise<DeleteAddressResponseDTO>;
}
