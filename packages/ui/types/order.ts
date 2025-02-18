import { OrderPaymentMode, OrderStatus } from '../enums/order';
import { IAddress } from './address';
import { IProduct } from './product';
import { IUser } from './user';

export interface IOrderItem {
  id: number;
  price: number;
  product?: IProduct;
  order?: IOrder;
  quantity: number;
}

export interface IOrder {
  id: number;
  orderId: string;
  totalAmount: number;
  discount: number;
  discountedAmount: number;
  shippingCharges: number;
  paymentMode: OrderPaymentMode;
  codCharges: number;
  status: OrderStatus;
  items: IOrderItem[];
  user: IUser;
  address: IAddress;
  // addressName: string;
  // addressLine1: string;
  // addressLine2: string;
  // city: string;
  // state: string;
  // country: string;
  // postalCode: string;
  // addressPhoneNumber: string;
  // addressEmail: string;
  // additionalInstructions: string;
  coupon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderRequestBody {
  items: {
    productId: number;
    quantity: number;
  }[];
  address: IAddress;
  coupon: string;
  paymentMode?: OrderPaymentMode;
}

export interface IPaymentPayload {
  name: string;
  mobile: string;
  amount: number;
  orderId: number;
}
