// import mongoose, { Model } from 'mongoose';
// import { ICartRepository } from '../interfaces/cart.repository.interface';
// import { Cart } from "../../models/interfaces/user.interface";
// import CartModel from '../../models/user.cart.model';
// import { DeleteUserCartDTO, RemoveCartItemDTO, UpdateQuantityDTO } from '../../dto/cart/cart.dto';



// export default class CartRepository implements ICartRepository {

//     async findCartByUserId(userId: string): Promise<Cart | null> {
//         try {
//             return await CartModel
//                 .findOne({ userId })
//                 .lean();
//         } catch (error) {
//             console.log('Error finding cart by user ID:', error);
//             throw error;
//         }
//     }

//     async createCart(cartData: Partial<Cart>): Promise<Cart> {
//         try {
//             const cart = new CartModel(cartData);
//             return await cart.save();
//         } catch (error) {
//             console.log('Error creating cart:', error);
//             throw error;
//         }
//     }

//     async updateCart(cartId: string, cartData: Partial<Cart>): Promise<Cart> {
//         try {
//             const updatedCart = await CartModel
//                 .findByIdAndUpdate(cartId, cartData, { new: true })
//                 .lean();
//             if (!updatedCart) {
//                 throw new Error('Cart not found');
//             }
//             return updatedCart;
//         } catch (error) {
//             console.log('Error updating cart:', error);
//             throw error;
//         }
//     }

//     async updateCartItemQuantity(data: UpdateQuantityDTO): Promise<any> {
//         const { user_id, menuId, quantity } = data;

//         try {
//             const cart = await this.findCartByUserId(user_id);
//             if (!cart) throw new Error('Cart not found');

//             let totalAmount = 0;
//             const updatedItems = cart.items.map((item) => {
//                 if (item.menuId.toString() === menuId) {
//                     item.quantity = quantity;
//                 }
//                 totalAmount += item.price * item.quantity;
//                 return item;
//             });

//             const updatedCart = await CartModel.findOneAndUpdate(
//                 { userId: user_id },
//                 {
//                     $set: {
//                         items: updatedItems,
//                         totalAmount: totalAmount,
//                         updatedAt: new Date(),
//                     },
//                 },
//                 { new: true }
//             );

//             return updatedCart;

//         } catch (error) {
//             console.log('Error updateCartItemQuantity by user ID:', error);
//             throw error;
//         }
//     }

//     async removeCartItemsById(data: RemoveCartItemDTO): Promise<any> {
//         const { user_id, menuId } = data;

//         try {
//             const cart = await CartModel.findOne({ userId: user_id });
//             if (!cart) {
//                 throw new Error('Cart not found');
//             }

//             cart.items = cart.items.filter(
//                 (item: any) => item.menuId.toString() !== menuId.toString()
//             );

//             cart.totalAmount = cart.items.reduce((sum: number, item: any) => {
//                 const itemTotal = item.price * item.quantity;
//                 const discountAmount = (item.discount / 100) * itemTotal;
//                 return sum + (itemTotal - discountAmount);
//             }, 0);

//             cart.updatedAt = new Date();


//             const updatedCart = await cart.save();

//             return updatedCart;
//         } catch (error) {
//             console.log('Error in removeCartItemsById:', error);
//             throw error;
//         }
//     }

//     async deleteUserCartById(data: DeleteUserCartDTO): Promise<any> {
//         const { user_id } = data;
//         try {
//             const result = await CartModel.deleteOne({ userId: user_id });
//             if (result.deletedCount === 0) {
//                 throw new Error('No cart found for this user');
//             }
//             return result;
//         } catch (error) {
//             console.log('Error in deleteUserCartById:', error);
//             throw error;
//         }
//     }

// }




import mongoose, { Model } from 'mongoose';
import { ICartRepository } from '../interfaces/cart.repository.interface';
import { Cart } from "../../models/interfaces/user.interface";
import CartModel from '../../models/user.cart.model';
import { DeleteUserCartDTO, RemoveCartItemDTO, UpdateQuantityDTO } from '../../dto/cart/cart.dto';
import { BaseRepository } from './base.repository';

export default class CartRepository extends BaseRepository<any> implements ICartRepository {
    constructor() {
        super(CartModel);
    }

    async findCartByUserId(userId: string): Promise<Cart | null> {
        try {
            return await CartModel
                .findOne({ userId })
                .lean();
        } catch (error) {
            console.log('Error finding cart by user ID:', error);
            throw error;
        }
    }

    async createCart(cartData: Partial<Cart>): Promise<Cart> {
        try {
            const cart = new CartModel(cartData);
            return await cart.save();
        } catch (error) {
            console.log('Error creating cart:', error);
            throw error;
        }
    }

    async updateCart(cartId: string, cartData: Partial<Cart>): Promise<Cart> {
        try {
            const updatedCart = await CartModel
                .findByIdAndUpdate(cartId, cartData, { new: true })
                .lean();
            if (!updatedCart) {
                throw new Error('Cart not found');
            }
            return updatedCart;
        } catch (error) {
            console.log('Error updating cart:', error);
            throw error;
        }
    }

    async updateCartItemQuantity(data: UpdateQuantityDTO): Promise<any> {
        const { user_id, menuId, quantity } = data;

        try {
            const cart = await this.findCartByUserId(user_id);
            if (!cart) throw new Error('Cart not found');

            let totalAmount = 0;
            const updatedItems = cart.items.map((item) => {
                if (item.menuId.toString() === menuId) {
                    item.quantity = quantity;
                }
                totalAmount += item.price * item.quantity;
                return item;
            });

            const updatedCart = await CartModel.findOneAndUpdate(
                { userId: user_id },
                {
                    $set: {
                        items: updatedItems,
                        totalAmount: totalAmount,
                        updatedAt: new Date(),
                    },
                },
                { new: true }
            );

            return updatedCart;

        } catch (error) {
            console.log('Error updateCartItemQuantity by user ID:', error);
            throw error;
        }
    }

    async removeCartItemsById(data: RemoveCartItemDTO): Promise<any> {
        const { user_id, menuId } = data;

        try {
            const cart = await CartModel.findOne({ userId: user_id });
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = cart.items.filter(
                (item: any) => item.menuId.toString() !== menuId.toString()
            );

            cart.totalAmount = cart.items.reduce((sum: number, item: any) => {
                const itemTotal = item.price * item.quantity;
                const discountAmount = (item.discount / 100) * itemTotal;
                return sum + (itemTotal - discountAmount);
            }, 0);

            cart.updatedAt = new Date();

            const updatedCart = await cart.save();

            return updatedCart;
        } catch (error) {
            console.log('Error in removeCartItemsById:', error);
            throw error;
        }
    }

    async deleteUserCartById(data: DeleteUserCartDTO): Promise<any> {
        const { user_id } = data;
        try {
            const result = await CartModel.deleteOne({ userId: user_id });
            if (result.deletedCount === 0) {
                throw new Error('No cart found for this user');
            }
            return result;
        } catch (error) {
            console.log('Error in deleteUserCartById:', error);
            throw error;
        }
    }
}