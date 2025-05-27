import { model } from 'mongoose';
import UserSchema from './schemas/user.schema';
import { UserInterface } from './interfaces/user.interface';

const userModel = model<UserInterface>('User', UserSchema);

export default userModel;