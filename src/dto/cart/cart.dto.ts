export interface CartItemDTO {
    menuId: string;
    quantity: number;
    price: number;
    name: string;
    category: string;
    restaurantId:string;
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

export interface GetCartDTO {
    user_id: string;
}

export interface UpdateQuantityDTO {
    user_id: string;
    menuId: string;
    quantity: number;
}


export interface RemoveCartItemDTO {
    user_id: string;
    menuId: string;
}

export interface DeleteUserCartDTO {
    user_id: string;
}