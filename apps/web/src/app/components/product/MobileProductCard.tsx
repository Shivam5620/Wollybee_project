'use client';

import Image from 'next/image';
import RatingStars from '../common/RatingStars';
import Link from 'next/link';
import { ICONS } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import { Size } from '@repo/ui/enums/size';
import AddToCartMobileProductCardButton from './AddToCartMobileProductCardButton';
import { ClassNameValue } from 'tailwind-merge';
import { getAgesLabel } from '../common/common.utils';

const MobileProductCard = ({
  product,
  className = 'xs:shadow-[1px_2px_20px_5px_#00000010] shadow-[1px_2px_20px_4px_#00000010]',
}: {
  product: IProduct;
  className?: ClassNameValue;
}) => {
  const agesLabel = getAgesLabel(product.ages);
  return (
    <div className="my-2">
      <div className="relative mx-auto mt-2 flex  w-[150px] min-w-[120px] flex-col overflow-hidden rounded-xl bg-white shadow-lg">
        {product.isNew && (
          <div className="absolute">
            <div className="shadow-sm z-[8] relative flex rotate-[-36deg] w-[70px] h-[70px] md:pl-1 -top-[43px] md:-top-[41px] -left-[38px] rounded-full bg-tertiary-green items-center justify-center">
              <span className="font-cheri absolute bottom-0 md:bottom-0.5 text-[10px] text-white">
                new
              </span>
            </div>
          </div>
        )}

        <div className="mx-2 relative">
          <Link href={`/product/detail/${product.id}`}>
            <Image
              src={product?.images?.[0]?.url}
              alt="productImage"
              width={100}
              className="overflow-hidden w-[100px] h-[100px] mx-auto p-2 rounded-md"
              height={100}
            />
          </Link>

          <div className="absolute -right-1 -bottom-0">
            <Image
              alt="Hexagon"
              className="relative w-9 h-9"
              height={10}
              src={ICONS.hexagon}
              width={30}
            />
            <div className="font-heyComic absolute text-[10px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white">
              <p>Ages</p>
              <p>{agesLabel}</p>
            </div>
          </div>
        </div>

        <div className="font-heyComic flex-col text-center justify-center">
          <p className="text-venetian-red text-[12px] truncate px-4">
            {product.name}
          </p>
          <section className="flex justify-center items-center">
            <RatingStars
              variant={Size.small}
              rating={product.averageRating ?? 0}
              hexColor="#3884C5"
              disabled={true}
              starClassName="xl:w-[15px] px-[1.5px] xs:mx-0"
            />
            <p className="text-[10px] mt-2 ml-2 font-semibold text-primary-gray font-heyComic">
              {product.reviewCount ?? 0}{' '}
              {product.reviewCount === 1 ? 'review' : 'reviews'}
            </p>
          </section>
          <section className="flex gap-3 mt-1 text-sm justify-center font-heyComic">
            <p>Rs. {product.discountedPrice}</p>
            <p className="text-secondary-venetican-red line-through">
              Rs. {product.price}
            </p>
          </section>
        </div>

        <div className="flex sm:flex-row font-heyComic w-full gap-1 px-3 justify-center mt-1 pb-3">
          <AddToCartMobileProductCardButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
