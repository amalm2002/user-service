
import { UserInterface, registration } from '../../models/interfaces/user.interface';

export interface IUserRepository {
  saveUser(userData: registration): Promise<any>;
  findUserById(userId: string): Promise<UserInterface | null>;
  findUserByEmail(email: string): Promise<UserInterface | null>;
  findAllUsers(status: boolean): Promise<UserInterface[] | undefined>;
  findBlockUser(userId: string): Promise<{ success: boolean; message: string, isActive?: boolean ,userId?:string}>;
  updateUserPassword(email: string, password: string): Promise<UserInterface | null>;
  updateUser(userId: string, data: { name: string; phone: string }): Promise<UserInterface | null>;
  addAddress(userId: string, address: any): Promise<any>;
  updateAddress(userId: string, index: number, address: any): Promise<any>;
  deleteAddressByIndex(userId: string, addressIndex: number): Promise<{ success: boolean; message: string }>;
}