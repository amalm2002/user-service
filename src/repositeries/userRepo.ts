import User from '../entities/user.model'
import { registration } from '../entities/user.interface'


export default class userRepository {

    saveUser = async (userData: registration) => {
        try {
            const userCount = await User.countDocuments()
            const newUser = new User({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                isAdmin: userCount === 0,
            })

            const saveUser = await newUser.save()
            return saveUser

        } catch (error) {
            console.log(error, 'userRepo');
            return (error as Error).message
        }
    }

    findUserById = async (userId: string) => {
        try {
            const user = await User.findById(userId)
            return user
        } catch (error) {
            console.log(error, 'findUserById Error');
            return null;
        }
    }

    findUserByEmail = async (email: string) => {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            console.log(error, 'findUserByEmail Error');
            return null;
        }
    }

    findAllUsers = async (status: boolean) => {
        try {
            const allUser = await User.find({ isAdmin: false })

            return allUser

        } catch (error) {
            console.log(error, 'error on findAllUsers');

        }
    }

    findBlockUser = async (userId: string) => {
        try {
            const blockUser = await User.findById(userId)
            if (!blockUser) {
                return { success: false, message: 'User Not Found' }
            }

            blockUser.isActive = !blockUser.isActive
            await blockUser.save()

            return {
                success: blockUser.isActive ? true : false,
                message: blockUser.isActive ? "User unblocked successfully" : "User blocked successfully",
            };

        } catch (error) {
            console.log(error, "error on findBlockUser");
            return { success: false, message: "Error blocking user" };
        }
    }

    updateUserPassword = async (email: string, password: string) => {
        try {
            const user = await User.findOneAndUpdate({ email }, { password }, { new: true });
            return user;
        } catch (error) {
            console.error('Error in updateUserPassword:', error);
            throw new Error('Failed to update password');
        }
    };

    updateUser = async (userId: string, data: { name: string; phone: string }) => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { name: data.name, phone: data.phone, updatedAt: new Date() },
                { new: true }
            );
            return user;
        } catch (error) {
            console.log('updateUser Error', error);
            return null;
        }
    };

    addAddress = async (userId: string, address: any) => {
        try {

            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }


            const isDuplicate = user.address?.some(
                (existingAddress) =>
                    existingAddress.city === address.city &&
                    existingAddress.pinCode === address.pinCode &&
                    existingAddress.state === address.state &&
                    existingAddress.street === address.street
            );

            if (isDuplicate) {
                throw new Error('Address already exists');
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { address } },
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('Failed to add address');
            }

            return address;
        } catch (error) {
            console.log('addAddress Error', error);
            throw error;
        }
    };

    updateAddress = async (userId: string, index: number, address: any) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.address || index < 0 || index >= user.address.length) {
                throw new Error('Invalid address index');
            }

            const isDuplicate = user.address.some(
                (existingAddress, i) =>
                    i !== index &&
                    existingAddress.city === address.city &&
                    existingAddress.pinCode === address.pinCode &&
                    existingAddress.state === address.state &&
                    existingAddress.street === address.street
            );

            if (isDuplicate) {
                throw new Error('Address already exists');
            }

            user.address[index] = address;
            await user.save();
            return address;
        } catch (error) {
            console.log('updateAddress Error', error);
            throw error;
        }
    };

    deleteAddressByIndex = async (userId: string, addressIndex: number) => {
        const user = await User.findById(userId);
        console.log(user,addressIndex);
        
        if (!user) throw new Error('User not found');
      
        if (addressIndex < 0 || addressIndex >= user.address.length) {
          throw new Error('Invalid address index');
        }
      
        user.address.splice(addressIndex, 1);
      
        user.markModified('address');
      
        await user.save();
      
        return { success: true, message: 'Address deleted successfully' };
      };
      
}