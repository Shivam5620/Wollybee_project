import { IProductAge } from './productAge';
import { IProductCategory } from './productCategory';
import { IProductInterest } from './productInterest';

interface ISelectedFlag {
  isSelected: boolean;
  value: string;
}

export interface IProductCategorySelector extends IProductCategory {
  isSelected: boolean;
}
export interface IProductInterestSelector extends IProductInterest {
  isSelected: boolean;
}
export interface IProductAgeSelector extends IProductAge {
  isSelected: boolean;
}

export interface IFilter {
  categories: IProductCategory[];
  ages: IProductAge[];
  interests: IProductInterest[];
  prices: {
    min: number;
    max: number;
  }[];
}

export interface IFilterClient {
  categories: IProductCategorySelector[];
  ages: IProductAgeSelector[];
  interests: IProductInterestSelector[];
  prices: {
    id: number;
    name: string;
    value: {
      min: number;
      max: number;
    };
    isSelected: boolean;
  }[];
  common: {
    id: number;
    name: string;
    value: string;
    isSelected: boolean;
  }[];
}
