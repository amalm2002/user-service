
export interface IAdminController {
  getAllUsers(call: any, callback: any): Promise<void>;
  blockUser(call: any, callback: any): Promise<void>;
}