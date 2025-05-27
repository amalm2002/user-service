import { ICartController } from '../interfaces/cart.controller';
import { ICartService } from '../../services/interfaces/cart.service.interface';
import { AddToCartDTO, GetCartDTO, RemoveCartItemDTO, UpdateQuantityDTO } from '../../dto/cart/cart.dto';

export class CartController implements ICartController {
    private cartService: ICartService;

    constructor(cartService: ICartService) {
        this.cartService = cartService;
    }

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
                    restaurantName: call.request.item.restaurantName,
                    discount: call.request.item.discount,
                },
            };

            const response = await this.cartService.addToCartMenus(data);
            callback(null, response);
        } catch (error) {
            console.log('Error in cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }

    async getCartItems(call: any, callback: any): Promise<void> {
        try {
            // console.log('data is get :', call.request);
            if (!call.request.user_id) {
                throw new Error('user_id is missing in the request');
            }
            const userId: GetCartDTO = { user_id: call.request.user_id };
            const response = await this.cartService.getCartItems(userId);
            callback(null, response);
        } catch (error) {
            console.log('Error in get cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }

    async updateCartItemQuantity(call: any, callback: any): Promise<void> {
        try {
            // console.log('call request :', call.request);
            const data: UpdateQuantityDTO = {
                user_id: call.request.user_id,
                menuId: call.request.menuId,
                quantity: call.request.quantity
            }
            const response = await this.cartService.updateCartItemQuantity(data)
            callback(null, response)

        } catch (error) {
            console.log('Error in updateQty cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }

    async removeCartItems(call: any, callback: any): Promise<void> {
        try {
            console.log('call request :', call.request);
            const data: RemoveCartItemDTO = {
                user_id: call.request.user_id,
                menuId: call.request.menuId
            }
            const response = await this.cartService.removeCartItems(data)
            callback(null,response)
        } catch (error) {
            console.log('Error in removeItems cart controller:', error);
            callback({ error: (error as Error).message });
        }
    }
}