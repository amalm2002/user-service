import { RemoveCartItemDTO, UpdateQuantityDTO } from "../../dto/cart/cart.dto";
import { Cart } from "../../models/interfaces/user.interface";

export interface ICartRepository {
    findCartByUserId(userId: string): Promise<Cart | null>;
    createCart(cartData: Partial<Cart>): Promise<Cart>;
    updateCart(cartId: string, cartData: Partial<Cart>): Promise<Cart>;
    updateCartItemQuantity(data: UpdateQuantityDTO): Promise<any>
    removeCartItemsById(data: RemoveCartItemDTO): Promise<any>
}