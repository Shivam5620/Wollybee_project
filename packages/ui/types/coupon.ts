import { IProduct } from './product';

export interface ICoupon {
  code: string;                 // Coupon Code
  description: string;          // Description of the coupon
  discountPercentage: number;   // Percentage discount on the product
  redeemBefore: Date;           // Expiry date of the coupon
  maxDiscount: number;          // Max Discount that can be applied using coupon
  minCartValue: number;         // Minimum cart value required to apply coupon
  products: Array<IProduct>;    // Products to which coupon can be applied
  createdAt: Date;
  updatedAt?: Date;
}

export interface ICouponResponse extends Omit<ICoupon, 'products' | 'createdAt' | 'updatedAt'> {
  id: number;
  products: {
    id:number,
    name: string
  }[];
}

export interface ICouponRequestBody extends Omit<ICoupon, 'products' | 'createdAt' | 'updatedAt'> {
  productIds: Array<number>;
}
