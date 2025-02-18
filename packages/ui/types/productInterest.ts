import { IFile } from "./file";

export interface IProductInterest {
  id: number;
  name: string;
  color: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  file:IFile;
}

export interface ICreateProductInterestRequestBody extends Omit<IProductInterest, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'isDeleted' | 'file'> {
  isActive?: boolean;
  isDeleted?: boolean;
  fileId: number;
}

