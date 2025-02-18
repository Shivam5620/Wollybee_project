import Image from 'next/image';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../ui/components/ui/tabs';
import { MultipleItemsCarousel } from '../../../components/common/CustomCarousel';
import { ICONS } from '@repo/ui/lib';
import { IProductAdditionalInfoTab } from '@repo/ui/types';
import { ProductLightBox } from './ProductImagesView';
import { useState } from 'react';
import FsLightbox from 'fslightbox-react';

interface ICustomTabsProps {
  showTabs?: boolean;
  tabsData: IProductAdditionalInfoTab[];
  baseColor: string;
}

function CustomTabs({
  showTabs = false,
  tabsData,
  baseColor,
}: ICustomTabsProps) {
  const [toggler, setToggler] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <div
      style={{
        backgroundColor: baseColor,
      }}
      className={`px-2 rounded-bl-lg rounded-br-lg h-full sm:rounded-lg mx-2 pb-5 `}
    >
      <>
        <FsLightbox type="image" toggler={toggler} sources={[imageUrl]} />
      </>

      <Tabs defaultValue={'0'} className={`w-full ${showTabs ? '' : 'pt-1'}`}>
        {showTabs && (
          <TabsList className="justify-between sm:px-14">
            {tabsData.map((a, index) => (
              <TabsTrigger
                style={{
                  backgroundColor: a.color,
                }}
                key={a.title}
                className={`mx-1 w-full lg:text-xl xs:text-lg ${a.title.length < 20 ? 'text-lg' : 'text-md'} leading-5 justify-center text-center whitespace-normal break-words`}
                value={index.toString()}
              >
                {a.title}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        {tabsData.map((a, index) => (
          <TabsContent
            key={a.title + index}
            value={index.toString()}
            className="flex flex-col items-center px-2 sm:px-10  font-helveticaRoundedBold mt-0"
          >
            <div className="text-left text-white w-full whitespace-pre-line pt-6 sm:leading-[1.7rem] leading-[1.2rem]">
              {a.description}
            </div>
            <div className="flex justify-center mt-5">
              <div className="lg:w-[600px] w-[460px] ">
                <MultipleItemsCarousel
                  className="p-2"
                  Component={({ imageUrl }: { imageUrl: string }) => (
                    <div className="flex justify-center mx-auto">
                      <Image
                        onClick={() => {
                          setToggler(!toggler);
                          setImageUrl(imageUrl);
                        }}
                        className="rounded-lg"
                        alt="Product"
                        src={imageUrl}
                        width={150}
                        height={150}
                      />
                    </div>
                  )}
                  data={a.images?.map((a) => {
                    return { imageUrl: a.url };
                  })}
                  arrows={{
                    left: ICONS.carouselArrows.whiteLeft,
                    right: ICONS.carouselArrows.whiteRight,
                  }}
                  carouselId="product-detail-accordion"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CustomTabs;
