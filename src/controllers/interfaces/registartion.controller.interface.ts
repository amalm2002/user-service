
export interface IRegistrationController {
  signup(call: any, callback: any): Promise<void>;
  checkUser(call: any, callback: any): Promise<void>;
  resendOtp(call: any, callback: any): Promise<void>;
}