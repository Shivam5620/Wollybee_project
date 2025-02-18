import { IProduct } from "./product";

export interface IDealOfTheDay {
  date: Date;
  productIds: number[];
}

export interface IDealOfTheDayResponse {
  id : number;
  date : string;
  products : IProduct[];
}

export interface IDealOfTheDayRequestBody {
  date : string;
  productIds : number[];
}