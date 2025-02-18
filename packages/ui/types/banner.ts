import { BannerType } from '../enums/banner';
import { IFile } from './file';

export interface IBanner {
  id: number;
  title: string;
  description: string;
  type: BannerType;
  file: IFile;
  mobileFile: IFile;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBannerRequestBody
  extends Omit<
    IBanner,
    'file' | 'id' | 'createdAt' | 'updatedAt' | 'mobileFile'
  > {
  fileId: number;
  mobileFileId: number;
}
