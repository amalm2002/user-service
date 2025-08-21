import {
    AddToCartDTO,
    AddToCartresponseDTO,
    DeleteUserCartDTO,
    DeleteUserCartResponseDTO,
    GetCartDTO,
    GetCartResponseDTO,
    RemoveCartItemDTO,
    UpdateQuantityDTO,
    UpdateQuantityResponseDTO
} from "../../dto/cart/cart.dto";

export interface ICartService {
    addToCartMenus(cartData: AddToCartDTO): Promise<AddToCartresponseDTO>;
    getCartItems(cartRequest: GetCartDTO): Promise<GetCartResponseDTO>;
    updateCartItemQuantity(quantityUpdate: UpdateQuantityDTO): Promise<UpdateQuantityResponseDTO>
    removeCartItems(removeRequest: RemoveCartItemDTO): Promise<UpdateQuantityResponseDTO>
    deleteUserCart(dadeleteRequestta: DeleteUserCartDTO): Promise<DeleteUserCartResponseDTO>
}