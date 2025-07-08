import { AddToCartDTO, DeleteUserCartDTO, GetCartDTO, RemoveCartItemDTO, UpdateQuantityDTO } from "../../dto/cart/cart.dto";

export interface ICartService {
    addToCartMenus(data: AddToCartDTO): Promise<any>;
    getCartItems(userId: GetCartDTO): Promise<any>;
    updateCartItemQuantity(data: UpdateQuantityDTO): Promise<any>
    removeCartItems(data: RemoveCartItemDTO): Promise<any>
    deleteUserCart(data: DeleteUserCartDTO): Promise<any>
}