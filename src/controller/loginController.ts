import LoginUseCase from "../use-case/login.use-case";

export default class LoginController {

    private loginUseCase: LoginUseCase;

    constructor(loginUseCase: LoginUseCase) {
        this.loginUseCase = loginUseCase
    }

    checkLoginUser = async (call: any, callback: any) => {
        // console.log('data get on the user service...', call.request);
        const { email, password } = call.request
        try {
            const response = await this.loginUseCase.checkLoginUser(email, password)
            // console.log('responseeeeeeeeeeeeeeeeeeeeeeeeee checkkkkkkkkkkkkkkkkkkkkkkkkkkk',response);
            callback(null, response)
        } catch (error) {
            console.log(error);
            callback(null, { error: (error as Error).message });
        }
    }

    checkGoogleSignInUser = async (call: any, callback: any) => {
        console.log('Google data received:', call.request);
        const { email } = call.request;
        try {
            const response = await this.loginUseCase.checkGoogleUser(email);
            console.log('Google sign-in response:', response);
            callback(null, response);
        } catch (error) {
            console.log('Error in Google sign-in check:', error);
            callback({ code: 401, message: (error as Error).message }, null);
        }
    };
    

}