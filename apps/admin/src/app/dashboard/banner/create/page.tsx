import { IFile } from '@repo/ui/types/file';
import CreateBannerContainer from './CreateBannerContainer';
import { AxiosResponse } from 'axios';
import { endpoints, permissions } from '@repo/ui/lib';
import Error from '../error';
import ax from '../../../lib/axios';
import { Suspense } from 'react';
import Loader from '../../../components/common/Loader';
import havePermission from '../../../lib/withPermission';
import CustomError from '../../../components/common/CustomError';

const CreateBanner = async () => {
  let data: IFile[] = [];
  let error: string = '';

  try {
    const resData: AxiosResponse<IFile[]> = await ax({
      method: 'get',
      url: `${endpoints.file}`,
    });

    data = resData.data;
  } catch (err: unknown) {
    error = 'Error fetching Assets..';
  }

  if (error) {
    return <Error />;
  }

  const haveCreatePermission = await havePermission(permissions.banner.create);
  if (!haveCreatePermission) {
    return (
      <CustomError text="You do not have permission to access this page" />
    );
  }

  return (
    <Suspense fallback={<Loader text="Fetching images.." />}>
      {data && <CreateBannerContainer images={data} />}
    </Suspense>
  );
};

export default CreateBanner;
