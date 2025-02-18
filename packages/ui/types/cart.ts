import { IProduct } from "./product";

export interface ICart {
  ids : number[];
}

export interface ICartItemClient extends IProduct {
    quantity : number;
    cartId : number;
}
