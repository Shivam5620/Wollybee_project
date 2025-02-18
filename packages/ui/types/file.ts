import { FileType } from '../enums/file';

export interface IFile {
  id:number;
  name: string;
  path: string;
  url: string;
  type: FileType;
  createdAt?: Date;
  updatedAt?: Date;
}
