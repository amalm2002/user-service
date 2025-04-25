import UserRepository from "../repositeries/userRepo";

export default class ProfileUseCase {
    private userRepo: UserRepository

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    findUserByTheirId = async (userId: string) => {
        try {
            const user = await this.userRepo.findUserById(userId);

            if (!user) {
                return { message: 'No User Found', isAdmin: false };
            }

            return {
                message: 'Success',
                isAdmin: user.isAdmin,
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isActive: user.isActive,
                    address: Array.isArray(user.address)
                        ? user.address.map((addr) => ({
                            city: addr.city || '',
                            pinCode: addr.pinCode || 0,
                            state: addr.state || '',
                            street: addr.street || '',
                        }))
                        : [],
                    isAdmin: user.isAdmin,
                    //   wallet: user.wallet
                    //     ? {
                    //         balance: user.wallet.balance || 0,
                    //         transactions: user.wallet.transactions?.map((t) => ({
                    //           amount: t.amount || 0,
                    //           date: t.date || '',
                    //           details: t.details || '',
                    //           paymentMethod: t.paymentMethod || '',
                    //         })) || [],
                    //       }
                    //     : null,
                },
            };
        } catch (error) {
            console.log('error on userservice profile use-case find userByTheirId side...', error);
            throw new Error((error as Error).message);
        }
    };

    editProfileData = async (id: string, name: string, phone: string) => {
        try {
            const nameRegex = /^[A-Za-z]{4,}$/;
            const phoneRegex = /^[1-9][0-9]{9}$/;

            if (!name || !nameRegex.test(name)) {
                throw new Error('Name must be more than 3 letters, contain only letters, and have no spaces.');
            }
            if (!phone || !phoneRegex.test(phone)) {
                throw new Error('Phone number must be exactly 10 digits, not start with 0, and not be all zeros.');
            }

            const user = await this.userRepo.findUserById(id);
            if (!user) {
                throw new Error('User not found');
            }

            const updatedUser = await this.userRepo.updateUser(id, { name, phone });
            if (!updatedUser) {
                throw new Error('Failed to update user');
            }

            return {
                message: 'Success',
                isAdmin: updatedUser.isAdmin,
                user: {
                    id: updatedUser._id.toString(),
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phone: updatedUser.phone || '',
                    isActive: updatedUser.isActive,
                    address: Array.isArray(updatedUser.address)
                        ? updatedUser.address.map((addr) => ({
                            city: addr.city || '',
                            pinCode: addr.pinCode || 0,
                            state: addr.state || '',
                            street: addr.street || '',
                        }))
                        : [],
                    isAdmin: updatedUser.isAdmin,
                    // wallet: updatedUser.wallet
                    //   ? {
                    //       balance: updatedUser.wallet.balance || 0,
                    //       transactions: updatedUser.wallet.transactions?.map((t) => ({
                    //         amount: t.amount || 0,
                    //         date: t.date || '',
                    //         details: t.details || '',
                    //         paymentMethod: t.paymentMethod || '',
                    //       })) || [],
                    //     }
                    //   : null,
                },
            };
        } catch (error) {
            console.log('error on userservice profile use-case editProfileData side...', error);
            throw new Error((error as Error).message);
        }
    };

    updateAddress = async (userId: string, address: any, index: number) => {
        try {
            console.log('Use-case received:', { userId, address, index });

            const user = await this.userRepo.findUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            let updatedAddress;
            if (index === -1) {
                updatedAddress = await this.userRepo.addAddress(userId, address);
            } else {
                updatedAddress = await this.userRepo.updateAddress(userId, index, address);
            }

            return {
                message: 'Success',
                address: updatedAddress,
            };
        } catch (error) {
            console.log('error on userservice profile use-case updateAddress side...', error);
            throw new Error((error as Error).message);
        }
    };

    deleteAddress = async (userId: string, addressIndex: number) => {
        try {
            return await this.userRepo.deleteAddressByIndex(userId, addressIndex);
        } catch (error) {

        }
    }
}