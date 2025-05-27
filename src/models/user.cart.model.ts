import { model } from "mongoose";
import CartSchema from "./schemas/user.cart";
import { Cart } from "./interfaces/user.interface";

const cartModel = model<Cart>('Cart', CartSchema)

export default cartModel