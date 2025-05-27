
export interface ILoginController {
  checkLoginUser(call: any, callback: any): Promise<void>;
  checkGoogleSignInUser(call: any, callback: any): Promise<void>;
  forgotPasswordUser(call: any, callback: any): Promise<void>;
  verifyOtp(call: any, callback: any): Promise<void>;
  resetPassword(call: any, callback: any): Promise<void>;
}