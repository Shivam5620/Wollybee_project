export interface IProductCategory {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface ICreateProductCategoryRequestBody extends Omit<IProductCategory, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'isDeleted'>{}

