import { ICartController } from '../interfaces/cart.controller';
import { ICartService } from '../../services/interfaces/cart.service.interface';
import { AddToCartDTO, DeleteUserCartDTO, GetCartDTO, RemoveCartItemDTO, UpdateQuantityDTO } from '../../dto/cart/cart.dto';

export class CartController implements ICartController {

    constructor(
        private readonly _cartService: ICartService
    ) { }

    async addToCartMenus(call: any, callback: any): Promise<void> {
        try {

            const data: AddToCartDTO = {
                user_id: call.request.user_id,
                item: {
                    menuId: call.request.item.menuId,
                    quantity: call.request.item.quantity,
                    price: call.request.item.price,
                    name: call.request.item.name,
                    category: call.request.item.category,
                    restaurantId: call.request.item.restaurantId,
                    restaurantName: call.request.item.restaurantName,
                    discount: call.request.item.discount,
                    description: call.request.item.description,
                    timing: call.request.item.timing,
                    rating: call.request.item.rating,
                    hasVariants: call.request.item.hasVariants,
                    images: call.request.item.images,
                    variants: call.request.item.variants || [],
                },
            };

            const response = await this._cartService.addToCartMenus(data);
            callback(null, response);
        } catch (error) {
            console.log('Error in cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }

    async getCartItems(call: any, callback: any): Promise<void> {
        try {
            if (!call.request.user_id) {
                throw new Error('user_id is missing in the request');
            }
            const userId: GetCartDTO = { user_id: call.request.user_id };
            const response = await this._cartService.getCartItems(userId);
            callback(null, response);
        } catch (error) {
            console.log('Error in get cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }

    async updateCartItemQuantity(call: any, callback: any): Promise<void> {
        try {
            const data: UpdateQuantityDTO = {
                user_id: call.request.user_id,
                menuId: call.request.menuId,
                quantity: call.request.quantity
            }
            const response = await this._cartService.updateCartItemQuantity(data)
            callback(null, response)

        } catch (error) {
            console.log('Error in updateQty cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }

    async removeCartItems(call: any, callback: any): Promise<void> {
        try {
            const data: RemoveCartItemDTO = {
                user_id: call.request.user_id,
                menuId: call.request.menuId
            }
            const response = await this._cartService.removeCartItems(data)
            callback(null, response)
        } catch (error) {
            console.log('Error in removeItems cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }

    async deleteUserCart(call: any, callback: any): Promise<void> {
        try {
            const data: DeleteUserCartDTO = {
                user_id: call.request.user_id
            };
            const response = await this._cartService.deleteUserCart(data);
            console.log('deleteUserCart response:', response);
            callback(null, response);
        } catch (error) {
            console.log('Error in deleteUserCart cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }
}