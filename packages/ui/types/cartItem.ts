
import { CartAction } from "../enums/cart";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICartItem {
    id: number;
    quantity: number;
    product: IProduct;
    user: IUser;
}

export interface ICartItemResponse {
    id: number;
    quantity: number;
    productId: number;
}

export interface ICartItemRequestBody extends Omit<ICartItem, 'id' | 'product' | 'user'> {
    productId: number;
    action: CartAction; 
}