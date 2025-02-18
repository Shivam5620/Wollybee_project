import { IFile } from "./file";

export interface IProductAge {
  id: number;
  name: string;
  min: number;
  max: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  file: IFile;
}

export interface ICreateProductAgeRequestBody extends Omit<IProductAge, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'isDeleted' | 'file'> {
  isActive?: boolean;
  isDeleted?: boolean;
  fileId: number;
}