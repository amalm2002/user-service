export interface CartItemDTO {
    menuId: string;
    quantity: number;
    price: number;
    name: string;
    category: string;
    restaurantId: string;
    restaurantName: string;
    discount?: number;
    description: string;
    timing: string;
    rating: number;
    hasVariants: boolean;
    images: string[];
    variants: { name: string; price: number; quantity: number }[];
}

export interface AddToCartDTO {
    user_id: string;
    item: CartItemDTO;
}

export interface AddToCartresponseDTO {
    message: string;
    success?: boolean;
    cart?: any
}

export interface GetCartDTO {
    user_id: string;
}

export interface GetCartResponseDTO {
    items: CartItemDTO[];
    totalAmount?: number;
}

export interface UpdateQuantityDTO {
    user_id: string;
    menuId: string;
    quantity: number;
}

export interface UpdateQuantityResponseDTO {
    message: string;
    success: boolean;
    cart: {
        user_id: string;
        items: CartItemDTO;
        total_amount: number;
    }
}


export interface RemoveCartItemDTO {
    user_id: string;
    menuId: string;
}

export interface DeleteUserCartDTO {
    user_id: string;
}

export interface DeleteUserCartResponseDTO {
    success: boolean;
    message: string
}