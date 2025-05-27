
export interface ICartController {
    addToCartMenus(call: any, callback: any): Promise<void>
    getCartItems(call: any, callback: any): Promise<void>
    updateCartItemQuantity(call: any, callback: any): Promise<void>
    removeCartItems(call: any, callback: any): Promise<void>
}