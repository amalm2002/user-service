import { AddToCartDTO, AddToCartresponseDTO, DeleteUserCartDTO, DeleteUserCartResponseDTO, GetCartDTO, GetCartResponseDTO, RemoveCartItemDTO, UpdateQuantityDTO, UpdateQuantityResponseDTO } from "../../dto/cart/cart.dto";

export interface ICartService {
    addToCartMenus(data: AddToCartDTO): Promise<AddToCartresponseDTO>;
    getCartItems(userId: GetCartDTO): Promise<GetCartResponseDTO>;
    updateCartItemQuantity(data: UpdateQuantityDTO): Promise<UpdateQuantityResponseDTO>
    removeCartItems(data: RemoveCartItemDTO): Promise<UpdateQuantityResponseDTO>
    deleteUserCart(data: DeleteUserCartDTO): Promise<DeleteUserCartResponseDTO>
}