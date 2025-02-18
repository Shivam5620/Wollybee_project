import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IProductAge } from '@repo/ui/types';
import ListProductAge from './ListProductAge';
import { IFile } from '@repo/ui/types/file';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import havePermission from '../../lib/withPermission';
import CustomError from '../../components/common/CustomError';

const ListProductAgesContainer = async (): Promise<JSX.Element> => {
  let data: IProductAge[] = [];
  let images: IFile[] = [];
  let error: string = '';

  const haveReadProductAgesPermission = await havePermission(permissions.productAge.read);
  if (!haveReadProductAgesPermission) { 
    return <CustomError  text='You do not have permission to access this Page.'/>;
  }

  try {
    const res: AxiosResponse<IProductAge[]> = await ax({
      method: 'get',
      url: endpoints.productAge,
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
        <ListProductAge productAgeData={data} images={images} />
    </Suspense>
  );
};

export default ListProductAgesContainer;
