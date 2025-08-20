import { FindUserDto } from '../../dto/profile/find-user.dto';
import { UpdateProfileDto,UpdateProfileResponseDTO } from '../../dto/profile/update-profile.dto';
import { UpdateAddressDto ,UpdateAddressResponseDTO} from '../../dto/profile/update-address.dto';
import { DeleteAddressDto ,DeleteAddressResponseDTO} from '../../dto/profile/delete-address.dto';

export interface IProfileService {
  findUserByTheirId(data: FindUserDto): Promise<UpdateProfileResponseDTO>;
  editProfile(data: UpdateProfileDto): Promise<UpdateProfileResponseDTO>;
  addNewAddress(data: UpdateAddressDto): Promise<UpdateAddressResponseDTO>;
  deleteUserAddress(data: DeleteAddressDto): Promise<DeleteAddressResponseDTO>;
}
