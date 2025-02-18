import { ProductReviewStatus } from '../enums/productReview';
import { IFile } from './file';
import { IProduct } from './product';
import { IUser } from './user';

export interface IProductReview {
  id?: number;
  message: string;
  rating: number;
  media_urls: string[];
  media_keys: string[];
  status: ProductReviewStatus;
  product?: IProduct;
  user: IUser;
  createdAt?: Date;
}

export interface IProductReviewRequestBody
  extends Omit<IProductReview, 'createdAt' | 'product' | 'user' | 'id'> {
  productId: number;
}

export interface IProductReviewFilterOption {
  id: number;
  name: string;
  value: string;
  isSelected: boolean;
}
