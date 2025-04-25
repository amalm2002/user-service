import ProfileUseCase from "../use-case/profile.use-case";

export default class ProfileController {

    private profileUseCase: ProfileUseCase

    constructor(profileUseCase: ProfileUseCase) {
        this.profileUseCase = profileUseCase
    }

    findUserByTheirId = async (call: any, callback: any) => {
        try {
            const { id } = call.request;
            const response = await this.profileUseCase.findUserByTheirId(id);

            callback(null, {
                message: response.message,
                isAdmin: response.isAdmin,
                user: response.user
                    ? {
                        id: response.user.id,
                        name: response.user.name,
                        email: response.user.email,
                        phone: response.user.phone,
                        isActive: response.user.isActive,
                        address: Array.isArray(response.user.address)
                            ? response.user.address.map((addr: any) => ({
                                city: addr.city,
                                pinCode: addr.pinCode,
                                state: addr.state,
                                street: addr.street,
                            }))
                            : [],
                        isAdmin: response.user.isAdmin,
                        //   wallet: response.user.wallet,
                    }
                    : null,
            });
        } catch (error) {
            console.log('error on userservice profile controller side...', error);
            callback(new Error((error as Error).message));
        }
    };

    editProfile = async (call: any, callback: any) => {
        try {
            const { id, name, phone } = call.request;
            const response = await this.profileUseCase.editProfileData(id, name, phone);
            callback(null, {
                message: response.message,
                isAdmin: response.isAdmin,
                user: response.user
                    ? {
                        id: response.user.id,
                        name: response.user.name,
                        email: response.user.email,
                        phone: response.user.phone,
                        isActive: response.user.isActive,
                        address: response.user.address,
                        isAdmin: response.user.isAdmin,
                        //   wallet: response.user.wallet,
                    }
                    : null,
            });
        } catch (error) {
            console.log('error on userservice profile controller editProfile side...', error);
            callback(new Error((error as Error).message));
        }
    };

    addNewAddress = async (call: any, callback: any) => {
        try {
            const { userId, address, index } = call.request;

            const response = await this.profileUseCase.updateAddress(userId, address, index);

            callback(null, {
                message: response.message,
                address: {
                    city: response.address.city,
                    pinCode: response.address.pinCode,
                    state: response.address.state,
                    street: response.address.street,
                },
            });
        } catch (error) {
            console.log('error on userservice profile controller add new address side...', error);
            callback(new Error((error as Error).message))
        }
    }

    deleteUserAddress = async (call: any, callback: any) => {
        console.log('Incoming request:', call.request);
        try {
            const { id, index } = call.request;
            console.log('affter Incoming request:', call.request);
            
            const response = await this.profileUseCase.deleteAddress(id, index);

            callback(null, { success: true, message: 'Address deleted successfully' });
        } catch (error) {
            console.error('Error in UserService deleteUserAddress:', error);
            callback(new Error((error as Error).message));
        }
    };
}