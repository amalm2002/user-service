import { ICartService } from '../interfaces/cart.service.interface';
import { ICartRepository } from '../../repositories/interfaces/cart.repository.interface';
import { AddToCartDTO, AddToCartresponseDTO, DeleteUserCartDTO, DeleteUserCartResponseDTO, GetCartDTO, GetCartResponseDTO, RemoveCartItemDTO, UpdateQuantityDTO, UpdateQuantityResponseDTO } from '../../dto/cart/cart.dto';
import { Types } from 'mongoose';

export default class CartService implements ICartService {

    constructor(
        private readonly _cartRepository: ICartRepository
    ) { }

    async addToCartMenus(data: AddToCartDTO): Promise<AddToCartresponseDTO> {
        try {
            const { user_id, item } = data;

            if (!Types.ObjectId.isValid(user_id)) {
                throw new Error('Invalid user ID');
            }
            if (!Types.ObjectId.isValid(item.menuId)) {
                throw new Error('Invalid menu ID');
            }
            if (!Types.ObjectId.isValid(item.restaurantId)) {
                throw new Error('Invalid restaurant ID');
            }

            const userId = new Types.ObjectId(user_id);
            const foodId = new Types.ObjectId(item.menuId);
            const restaurantId = new Types.ObjectId(item.restaurantId);

            let cart = await this._cartRepository.findCartByUserId(user_id);

            if (cart) {

                const existingRestaurantId = cart.items[0]?.restaurantId?.toString();
                if (existingRestaurantId && existingRestaurantId !== item.restaurantId) {
                    return {
                        message: 'You can only add items from the same restaurant to the cart',
                        success: false,
                    };
                }

                const existingItemIndex = cart.items.findIndex(
                    (cartItem: any) => cartItem.menuId.toString() === item.menuId
                );

                if (existingItemIndex >= 0) {
                    return {
                        message: 'Item already in cart',
                        cart
                    };
                } else {
                    cart.items.push({
                        menuId: foodId,
                        quantity: item.quantity,
                        price: item.price,
                        name: item.name,
                        category: item.category,
                        discount: item.discount || 0,
                        restaurantName: item.restaurantName,
                        restaurantId: restaurantId,
                        description: item.description,
                        timing: item.timing,
                        rating: item.rating,
                        hasVariants: item.hasVariants,
                        images: item.images,
                        variants: item.variants || [],
                    });
                }

                cart.totalAmount = cart.items.reduce(
                    (total: number, cartItem: any) =>
                        total + cartItem.quantity * (cartItem.price - (cartItem.discount || 0)),
                    0
                );

                const updatedCart = await this._cartRepository.updateCart(cart._id.toString(), cart);
                return {
                    message: 'Item added to existing cart successfully',
                    cart: updatedCart,
                };
            } else {
                const newCart = {
                    userId: userId,
                    items: [
                        {
                            menuId: foodId,
                            quantity: item.quantity,
                            price: item.price,
                            name: item.name,
                            category: item.category,
                            discount: item.discount || 0,
                            restaurantName: item.restaurantName,
                            restaurantId: restaurantId,
                            description: item.description,
                            timing: item.timing,
                            rating: item.rating,
                            hasVariants: item.hasVariants,
                            images: item.images,
                            variants: item.variants || [],
                        },
                    ],
                    totalAmount: item.quantity * (item.price - (item.discount || 0)),
                };

                const createdCart = await this._cartRepository.createCart(newCart);
                console.log('created cart :', createdCart);

                return {
                    message: 'New cart created successfully',
                    cart: createdCart,
                };
            }
        } catch (error) {
            console.log('error on cart service side:', error);
            throw error;
        }
    }

    async getCartItems({ user_id }: GetCartDTO): Promise<GetCartResponseDTO> {
        try {

            if (!user_id || typeof user_id !== 'string') {
                throw new Error(`Invalid user ID: ${user_id} (must be a string)`);
            }
            if (!Types.ObjectId.isValid(user_id)) {
                throw new Error(`Invalid user ID format: ${user_id} (must be a valid ObjectId)`);
            }

            const cart = await this._cartRepository.findCartByUserId(user_id);

            if (!cart) {
                return { items: [] };
            }

            return {
                items: cart.items.map((item: any) => ({
                    menuId: item.menuId.toString(),
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    category: item.category,
                    restaurantId: item.restaurantId,
                    restaurantName: item.restaurantName,
                    discount: item.discount || 0,
                    description: item.description,
                    timing: item.timing,
                    rating: item.rating,
                    hasVariants: item.hasVariants,
                    images: item.images,
                    variants: item.variants || [],
                })),
                totalAmount: cart.totalAmount,
            };
        } catch (error) {
            console.log('Error in CartService.getCartItems:', error);
            throw error;
        }
    }

    async updateCartItemQuantity(data: UpdateQuantityDTO): Promise<UpdateQuantityResponseDTO> {
        try {
            const updatedCart = await this._cartRepository.updateCartItemQuantity(data);
            const responseData = {
                user_id: updatedCart.userId.toString(),
                items: updatedCart.items.map((item: any) => ({
                    menuId: item.menuId.toString(),
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name,
                    category: item.category,
                    restaurantId: item.restaurantId,
                    restaurantName: item.restaurantName,
                    discount: item.discount,
                    description: item.description,
                    timing: item.timing,
                    rating: item.rating,
                    hasVariants: item.hasVariants,
                    images: item.images,
                    variants: item.variants || [],
                })),
                total_amount: updatedCart.totalAmount,
            };

            return {
                message: 'Cart item quantity updated successfully',
                success: true,
                cart: responseData,
            };
        } catch (error) {
            console.log('Error in CartService.updateCartItemQuantity:', error);
            throw error;
        }
    }

    async removeCartItems(data: RemoveCartItemDTO): Promise<UpdateQuantityResponseDTO> {
        try {
            const updatedCart = await this._cartRepository.removeCartItemsById(data);

            const responseData = {
                user_id: updatedCart.userId.toString(),
                items: updatedCart.items.map((item: any) => ({
                    menuId: item.menuId.toString(),
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name,
                    category: item.category,
                    restaurantId: item.restaurantId,
                    restaurantName: item.restaurantName,
                    discount: item.discount,
                    description: item.description,
                    timing: item.timing,
                    rating: item.rating,
                    hasVariants: item.hasVariants,
                    images: item.images,
                    variants: item.variants || [],
                })),
                total_amount: updatedCart.totalAmount,

            };
            return {
                message: 'Item removed from cart successfully',
                success: true,
                cart: responseData,
            };
        } catch (error) {
            console.log('Error in CartService.removeCartItems:', error);
            throw error;
        }
    }

    async deleteUserCart(data: DeleteUserCartDTO): Promise<DeleteUserCartResponseDTO> {
        try {
            await this._cartRepository.deleteUserCartById(data);
            return { success: true, message: 'Cart deleted successfully' };
        } catch (error) {
            console.log('error on cart service deleteUserCart side:', error);
            throw error;
        }

    }

}