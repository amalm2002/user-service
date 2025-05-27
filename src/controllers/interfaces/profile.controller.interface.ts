
export interface IProfileController {
  findUserByTheirId(call: any, callback: any): Promise<void>;
  editProfile(call: any, callback: any): Promise<void>;
  addNewAddress(call: any, callback: any): Promise<void>;
  deleteUserAddress(call: any, callback: any): Promise<void>;
}