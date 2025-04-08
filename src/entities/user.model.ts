import { model } from "mongoose";
import UserSchema from "./user.schema";
import {UserInterface  } from "./user.interface";

const userModel=model<UserInterface>('User',UserSchema)

export default userModel