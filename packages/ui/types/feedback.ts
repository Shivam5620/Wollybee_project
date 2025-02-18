import { FeedbackType } from '../enums/feedback';
import { IProduct } from './product';

export interface IFeedback {
  id?: number;
  reason: string;
  products: IProduct[];
  type: FeedbackType;
}

export interface IFeedbackRequestBody extends Omit<IFeedback, 'products'> {
  productIds: number[];
}

export interface IFeedbackOptions {
  name: string;
  value: string;
}
