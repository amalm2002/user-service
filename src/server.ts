import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import "dotenv/config";
import connectDB from './config/mongo.config';
import { RegistrationController } from './controllers/implementations/registration.controller';
import { LoginController } from './controllers/implementations/login.controller';
import { AdminController } from './controllers/implementations/admin.controller';
import { ProfileController } from './controllers/implementations/profile.controller';
import { UserRepository } from './repositories/implementations/user.repository';
import { AuthService } from './services/implementations/auth.service';
import { BcryptService } from './services/implementations/bcrypt.service';
import { GenerateOtpService } from './services/implementations/generate-otp.service';
import { NodemailerService } from './services/implementations/nodemailer.service';
import { CartController } from './controllers/implementations/cart.controller';
import CartService from './services/implementations/cart.service';
import CartRepository from './repositories/implementations/cart.repository';
import { WalletController } from './controllers/implementations/wallet.controller';
import { WalletService } from './services/implementations/wallet.service';
import { ProfileService } from './services/implementations/profile.service';
import { WalletRepository } from './repositories/implementations/wallet.repository';
import { LoginService } from './services/implementations/login.service';
import { RegistrationService } from './services/implementations/registration.service';
import express from 'express';

connectDB();

const userRepo = new UserRepository();
const authService = new AuthService();
const bcryptService = new BcryptService();
const generateOtpService = new GenerateOtpService();
const nodemailerService = new NodemailerService();
const cartRepo = new CartRepository()
const walletRepo = new WalletRepository()
const cartService = new CartService(cartRepo)
const walletService = new WalletService(walletRepo)
const profileService = new ProfileService(userRepo)
const loginService = new LoginService(userRepo, authService, bcryptService)
const registrationService = new RegistrationService(authService, userRepo, bcryptService)


const registrationController = new RegistrationController(registrationService);
const loginController = new LoginController(loginService);
const adminController = new AdminController(userRepo);
const profileController = new ProfileController(profileService);
const cartController = new CartController(cartService,)
const walletController = new WalletController(walletService)

const app = express();
const router = express.Router()


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
  CreateUser: registrationController.signup.bind(registrationController),
  CheckUser: registrationController.checkUser.bind(registrationController),
  ResendOtp: registrationController.resendOtp.bind(registrationController),
  CheckUserLogin: loginController.checkLoginUser.bind(loginController),
  CheckGoogleSignIn: loginController.checkGoogleSignInUser.bind(loginController),
  ForgotPasswordUser: loginController.forgotPasswordUser.bind(loginController),
  VerifyOtp: loginController.verifyOtp.bind(loginController),
  ResetPassword: loginController.resetPassword.bind(loginController),
  GetAllUsers: adminController.getAllUsers.bind(adminController),
  BlockUser: adminController.blockUser.bind(adminController),
  GetUserById: profileController.findUserByTheirId.bind(profileController),
  UpdateUser: profileController.editProfile.bind(profileController),
  UpdateUserAddress: profileController.addNewAddress.bind(profileController),
  DeleteUserAddress: profileController.deleteUserAddress.bind(profileController),
  AddToCart: cartController.addToCartMenus.bind(cartController),
  GetCartItems: cartController.getCartItems.bind(cartController),
  UpdateCartItemQuantity: cartController.updateCartItemQuantity.bind(cartController),
  RemoveCartItem: cartController.removeCartItems.bind(cartController),
  DeleteUserCart: cartController.deleteUserCart.bind(cartController),
  UpdateWallet: walletController.updateWallet.bind(walletController)
});
const port = process.env.PORT || '3003';
const grpcServer = () => {
  
  const Domain = process.env.NODE_ENV === 'dev' ? process.env.DEV_DOMAIN : process.env.PRO_DOMAIN_USER;
  console.log('domain :',Domain)
  server.bindAsync(`${Domain}:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
    if (err) {
      console.error("Error starting gRPC server:", err);
      return;
    }
    console.log(`gRPC user server started on port:${bindPort}`);
  });
};

app.use((req,res,next)=>{
  console.log(req.method , 'method' , req.url , "url")
  next();
})


app.listen(port,()=>{
  console.log("trying to rurn")
grpcServer();
})

