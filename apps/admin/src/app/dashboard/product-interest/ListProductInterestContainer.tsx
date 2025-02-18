import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IProductInterest } from '@repo/ui/types';
import ListProductInterest from './ListProductInterest';
import { IFile } from '@repo/ui/types/file';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import havePermission from '../../lib/withPermission';
import CustomError from '../../components/common/CustomError';

const ListProductInterestContainer = async (): Promise<JSX.Element> => {
  let data: IProductInterest[] = [];
  let images: IFile[] = [];
  let error: string = '';
  
  const haveReadProductInterestPermission = await havePermission(permissions.productInterest.read);
  if(!haveReadProductInterestPermission) {
      return <CustomError text='You do not have permission to access this page' />
  }
  try {
    const res: AxiosResponse<IProductInterest[]> = await ax({
      method: 'get',
      url: endpoints.productInterest,
    });
    const resImages: AxiosResponse<IFile[]> = await ax({
      method: 'get',
      url: endpoints.file,
    });

    data = res.data;
    images = resImages.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <Error />;
  }

  return (
    <Suspense fallback={<Loader text='Loading Product Interest..' />}>
        <ListProductInterest productInterestData={data} images={images} />
    </Suspense>
  );
};

export default ListProductInterestContainer;
