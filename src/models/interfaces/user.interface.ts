import { Document, ObjectId } from 'mongoose';
import { Types } from 'mongoose';

export interface UserInterface extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    googleId: string;
    isActive: boolean;
    profileImage: string;
    wallet: {
        balance: number;
        transaction: {
            date: Date;
            details: string;
            amount: number;
            status: string;
        }[];
    };
    isAdmin: boolean;
    phone: string;
    address: {
        city: string;
        pinCode: number;
        state: string;
        street: string;
    }[];
}

export interface registration {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isActive?: boolean;
    googleId?: string | null;
}

export interface userData {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isActive?: boolean;
    googleId?: string | null;
}

export interface CartItems {
    menuId: Types.ObjectId;
    quantity: number;
    price: number;
    name: string;
    discount: number;
    category: string;
    restaurantName: string;
    restaurantId: Types.ObjectId;
    description: string;
    timing: string;
    rating: number;
    hasVariants: boolean;
    images: string[];
    variants: { name: string; price: number; quantity: number }[];
}

export interface Cart {
    _id: string;
    userId: Types.ObjectId;
    items: CartItems[];
    totalAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IWallet {
    userId: Types.ObjectId;
    balance: number;
    transactions: {
        amount: number;
        type: 'credit' | 'debit';
        description: string;
        createdAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}