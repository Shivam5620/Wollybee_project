import { AxiosResponse } from 'axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { Suspense } from 'react';
import { IBanner } from '@repo/ui/types';
import ListBanners from './ListBanners';
import ax from '../../lib/axios';
import Error from './error';
import Loader from '../../components/common/Loader';
import havePermission from '../../lib/withPermission';
import CustomError from '../../components/common/CustomError';

const Banner = async (): Promise<JSX.Element> => {
  let data: IBanner[] = [];
  let error: string = '';

  try {
    const resData: AxiosResponse<IBanner[]> = await ax({
      method: 'get',
      url: `${endpoints.banner}`,
    });

    data = resData.data;
  } catch (err: unknown) {
    error = 'Error fetching Banner...';
  }

  if (error) {
    return <Error />;
  }

  const haveReadPermission = await havePermission(permissions.banner.read);

  if (!haveReadPermission) {
    return (
      <CustomError text="You do not have permission to access this page" />
    );
  }

  return (
    <>
      <Suspense fallback={<Loader text="Fetching Banners..." />}>
        <ListBanners bannerData={data} />
      </Suspense>
    </>
  );
};

export default Banner;
