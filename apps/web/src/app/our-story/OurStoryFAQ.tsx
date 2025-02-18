import { ICONS } from '@repo/ui/lib';
import Image from 'next/image';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { MultipleItemsCarousel } from '../components/common/CustomCarousel';

import Link from 'next/link';
import { IFaqCategory } from '@repo/ui/types/faq';

const FaqCarouselComponent = ({
  name,
  imageUrl = '',
}: {
  name: string;
  imageUrl: string;
}) => {
  return (
    <div className="md:px-6 ">
      <Link
        className="flex flex-col gap-6 items-center bg-white rounded-2xl md:p-10 p-6 w-full min-h-[220px]"
        href={'/faq'}
      >
        <div
          className={`md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px] w-[100px] h-[100px] rounded-full`}
        >
          <Image
            width={100}
            height={100}
            alt="image"
            className="w-full"
            src={imageUrl != '' ? imageUrl : '/our-story/productsFaq.svg'}
          />
        </div>
        <p className="text-primary-black md:text-2xl sm:text-lg text-base font-heyComic text-center">
          {name}
        </p>
      </Link>
    </div>
  );
};

export const OurStoryFaq = ({
  className,
  faqData,
}: {
  className: ClassNameValue;
  faqData: IFaqCategory[];
}) => {
  return (
    <div className={twMerge('', className)}>
      <div className="mt-10">
        <Image
          alt="wave"
          src={ICONS.greenWave}
          width={100}
          height={100}
          className="w-full translate-y-2 "
        />
      </div>
      <div className="bg-tertiary-green pb-56 md:px-10 px-4">
        <h1 className="font-cheri text-secondary-color md:text-7xl text-5xl text-center lg:mb-16 md:mb-10 mb-8 pt-8">
          FAQ'S
        </h1>
        <MultipleItemsCarousel
          centerMode={false}
          Component={FaqCarouselComponent}
          data={faqData}
          arrows={{
            left: ICONS.carouselArrows.whiteLeft,
            right: ICONS.carouselArrows.whiteRight,
          }}
          carouselId="faq-carousel"
          pagination={true}
        />
      </div>
    </div>
  );
};
