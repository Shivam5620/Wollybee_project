import { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import { Suspense } from 'react';
import { IBanner } from '@repo/ui/types';
import ax from '../../lib/axios';
import Banner from './Banner';
import { logError } from '../../../utils/helper';
import { BannerType } from '@repo/ui/enums/banner';

const BannerContainer = async ({
  filter,
}: {
  filter?: BannerType;
}): Promise<JSX.Element> => {
  let data: IBanner[] = [];
  let error: string = '';

  try {
    const resData: AxiosResponse<IBanner[]> = await ax({
      method: 'get',
      url: `${endpoints.banner}`,
    });

    data = resData.data ?? [];
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'BannerContainer');
    error = 'Error fetching Banner..';
  }

  return (
    <Suspense fallback={<></>}>
      <Banner bannerData={data} filter={filter} />
    </Suspense>
  );
};

export default BannerContainer;
