import mongoose, { Schema, model } from 'mongoose';
import { Cart } from '../interfaces/user.interface';

const cartItemSchema = new Schema(
    {
        menuId: {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        name: {
            type: String
        },
        restaurantId: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true
        },
        restaurantName: {
            type: String
        },
        category: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
        },
        timing: {
            type: String,
        },
        rating: {
            type: Number,
        },
        hasVariants: {
            type: Boolean,
            default: false,
        },
        images: {
            type: [String],
            default: [],
        },
        variants: [
            {
                name: { type: String },
                price: { type: Number },
                quantity: { type: Number },
                _id: false,
            },
        ],
    },
    { _id: false }
);

const CartSchema = new Schema<Cart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [cartItemSchema],
        totalAmount: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
);


export default CartSchema;
