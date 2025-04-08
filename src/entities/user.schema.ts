import { Schema } from "mongoose";
import { UserInterface } from "./user.interface";

const UserSchema:Schema=new Schema <UserInterface>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

export default UserSchema