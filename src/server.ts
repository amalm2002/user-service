import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import "dotenv/config"; 
import registrationControl from './controller/registrationController';
import RegistrationUseCases  from './use-case/registration.use-case'
import { AuthService } from './services/auth';
import UserRepository from "./repositeries/userRepo";
import connectDB from "./config/mongo";
import LoginController from './controller/loginController';
import AdminController from './controller/adminController';
import LoginUseCase from './use-case/login.use-case';
connectDB(); 

const adminControll=new AdminController()

const authService = new AuthService();
const userRepo = new UserRepository()
const registrationUseCases = new RegistrationUseCases(userRepo);
const loginUseCase=new LoginUseCase(userRepo,authService)

const registrationController = new registrationControl(authService,registrationUseCases)
const loginController=new LoginController(loginUseCase,authService)

const packageDef = protoLoader.loadSync(path.resolve(__dirname, './proto/user.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as any;
const userProto = grpcObject.user_package;

if (!userProto || !userProto.UserService || !userProto.UserService.service) {
  console.error("Failed to load the User service from the proto file.");
  process.exit(1);
}
 
const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  CreateUser: registrationController.signup,
  CheckUser:registrationController.checkUser,
  ResendOtp:registrationController.resendOtp,
  CheckUserLogin :loginController.checkLoginUser,
  CheckGoogleSignIn:loginController.checkGoogleSignInUser,
  ForgotPasswordUser:loginController.forgotPasswordUser,
  VerifyOtp:loginController.verifyOtp,
  ResetPassword:loginController.resetPassword,
  GetAllUsers:adminControll.getAllUsers,
  BlockUser:adminControll.blockUser
})


const grpcServer = () => {
  const port = process.env.PORT || '3003';
  const Domain=process.env.NODE_ENV==='dev'?process.env.DEV_DOMAIN:process.env.PRO_DOMAIN_USER
 
  server.bindAsync(`${Domain}:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
    if (err) {
      console.error("Error starting gRPC server:", err);
      return;
    }
    console.log(`gRPC user server started on port:${bindPort}`);
    // server.start();
  });
};

grpcServer();