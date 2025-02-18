import { IFile } from './file';
import { IProductAge } from './productAge';
import { IProductCategory } from './productCategory';
import { IProductInterest } from './productInterest';
import { IProductReview } from './productReview';

export interface IProductFilterPrice {
  min: number;
  max: number;
}

export interface IProductFilter {
  categories: IProductCategory[];
  interests: IProductInterest[];
  ages: IProductAge[];
  prices: IProductFilterPrice[];
}

export interface IProductAdditionalInfoTab {
  title: string;
  color: string;
  description: string;
  images: IFile[];
}

export interface IProductAdditionalInfo {
  title: string;
  color: string;
  tabs: IProductAdditionalInfoTab[];
}

export interface IProductAdditionalInfoTabRequestBody
  extends Omit<IProductAdditionalInfoTab, 'images'> {
  imageIds: number[];
}

export interface IProductAdditionalInfoRequestBody
  extends Omit<IProductAdditionalInfo, 'tabs'> {
  tabs: IProductAdditionalInfoTabRequestBody[];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  bestSelling: boolean;
  isNew: boolean;
  isComingSoon: boolean;
  isComboOrGift: boolean;
  minPlayers: number;
  maxPlayers: number | null;
  images: IFile[];
  benefits: IFile[];
  moreWaysToPlayDescription: string;
  moreWaysToPlayUrl: string;
  additionalInfo: IProductAdditionalInfo[];
  ages: IProductAge[];
  categories: IProductCategory[];
  interests: IProductInterest[];
  reviewCount?: number;
  averageRating?: number;
  // reviews?: IProductReview[];
}

export interface IProductRequestBody {
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  minPlayers: number;
  maxPlayers: number | null;
  imageIds: number[];
  additionalInfo: IProductAdditionalInfoRequestBody[];
  moreWaysToPlayDescription: string;
  moreWaysToPlayUrl: string;
  benefitIds: number[];
  categoryIds: number[];
  interestIds: number[];
  ageIds: number[];
  bestSelling?: boolean;
  isComboOrGift?: boolean;
  isNew?: boolean;
  isComingSoon?: boolean;
}
