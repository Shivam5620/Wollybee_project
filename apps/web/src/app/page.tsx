import { endpoints } from '@repo/ui/lib';
import ChooseThePerfectGiftContainer from './components/homepage/ChooseThePerfectGiftContainer';
import HomePageReviews from './components/homepage/HomePageReviews';
import { IProductAge } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import ax from './lib/axios';
import CustomError from './components/common/CustomError';
import WaveContainerHomePage from './components/common/WaveContainerHomePage';
import BannerContainer from './components/banner/BannerContainer';
import DealOfTheDayContainer from './components/homepage/DealOfTheDayContainer';
import ShopByAgeCarouselContainer from './shop-by-age/ShopByAgeCarouselContainer';
import { logError } from '../utils/helper';
import { Suspense } from 'react';
import HomePageSkeleton from './components/skeleton/HomePageSkeleton';
import BestSellers from './components/homepage/BestSellers';

export default async function Page() {
  let agesData: IProductAge[] = [];
  let error: string = '';

  try {
    const [resAgesData]: [AxiosResponse<IProductAge[]>] = await Promise.all([
      ax({
        method: 'get',
        url: `${endpoints.productAge}`,
      }),
    ]);
    agesData = resAgesData.data;
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'HomePage');
    error = 'Some Error Occured';
  }

  if (error) {
    return <CustomError />;
  }

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <main className="w-full overflow-clip">
        <BannerContainer />
        <ShopByAgeCarouselContainer agesData={agesData} />
        <div className="mb-20">
          <WaveContainerHomePage>
            <div className="w-full absolute top-[4%] xs:top-[5%]">
              <BestSellers />
            </div>
            <div className="w-full absolute top-[46%] xs:top-[44%] sm:top-[49%] md:top-[52%] lg:top-[48%] xl:top-[46%]">
              <ChooseThePerfectGiftContainer />
            </div>
          </WaveContainerHomePage>
        </div>
        <DealOfTheDayContainer />
        <div className="mt-10 md:mb-24 lg:mb-36 md:mt-20 px-[5%]">
          <HomePageReviews />
        </div>
      </main>
    </Suspense>
  );
}
