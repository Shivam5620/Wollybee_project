import Image from 'next/image';
import RatingStars from '../common/RatingStars';
import Link from 'next/link';
import { ICONS } from '@repo/ui/lib';
import { Button } from '../../../ui/components/ui/button';
import { IProduct } from '@repo/ui/types';
import { Size } from '@repo/ui/enums/size';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { Chipbox } from '../../../ui/components/ui/chipbox';
import AddToCartProductCardButton from './AddToCartProductCardButton';
import { getAgesLabel } from '../common/common.utils';
import BenefitsProductCardButton from './BenefitsProductCardButton';

// Server Component

const ProductCard = ({
  product,
  className = 'xs:shadow-[1px_2px_20px_5px_#00000010] shadow-[1px_2px_20px_4px_#00000010]',
}: {
  product: IProduct;
  className?: ClassNameValue;
}) => {
  const agesLabel = getAgesLabel(product.ages);

  return (
    <div className="flex justify-center my-1">
      <div
        className={twMerge(
          'xs:hover:-translate-y-1.5 transition-all relative w-full m-1 xs:px-4 px-1 pb-4 xs:pt-3 pt-0  flex h-70 flex-col overflow-hidden xs:rounded-[26px] rounded-2xl bg-white xl:max-w-[500px] min-w-[165px] md:min-w-[270px] md:w-[334px] md:h-auto sm:max-w-[280px] max-w-[240px]',
          className,
        )}
      >
        <div className="absolute md:top-3 top-2 xs:right-4 right-2 md:right-2 z-[8]">
          <Chipbox
            label={`Save ${product.discountPercentage?.toString()} %`}
            className={
              'bg-secondary-color border-none inline-flex items-center px-[0.7rem] xs:py-[0.4rem] py-[0.3rem] font-heyComic rounded-full shadow-lg md:text-base text-[10.5px] text-white w-auto h-auto'
            }
          />
        </div>

        {product.isNew && (
          <div className="absolute">
            <div className="shadow-sm z-[8] relative flex rotate-[-45deg] w-20 h-20 md:w-[90px] md:h-[90px] md:pl-1 -top-[40px] -left-[45px] xs:-top-[52px] xs:-left-[48px] md:-top-12 md:-left-12 rounded-full bg-tertiary-green items-center justify-center">
              <span className="font-cheri absolute bottom-0 md:pb-2 xs:pb-2 pb-1 xs:-ml-2 ml-1 md:text-lg text-xs text-white">
                new
              </span>
            </div>
          </div>
        )}

        <div className="mt-2 relative flex justify-center">
          <div className="xl:w-[300px] xl:h-[300px] sm:w-[250px] sm:h-[250px] xs:w-[200px] xs:h-[200px] w-[150px] h-[150px] overflow-hidden md:p-3 xs:p-2 p-1 flex">
            <Link href={`/product/detail/${product.id}`}>
              {' '}
              <Image
                src={product.images?.[0]?.url}
                alt="productImage"
                width={300}
                height={200}
                className="rounded-md "
              />
            </Link>
          </div>

          <div className="absolute -right-0 -bottom-2 sm:-bottom-3">
            <Image
              alt="Hexagon"
              className="relative w-11 h-11 xs:w-12 xs:h-12 md:w-14 md:h-14"
              height={15}
              src={ICONS.hexagon}
              width={55}
            />
            <div className="font-heyComic md:-ml-0.5 -ml-[1px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 xs:text-xs text-white text-center w-full">
              <p className="xs:text-sm text-[10px] font-cheri">Ages</p>
              <p
                className={`font-heyComic -mt-1 md:mt-0 ${agesLabel.length > 3 ? 'text-[8px] md:text-[14px]' : 'text-[12px] md:text-[16px]'}`}
              >
                {agesLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="font-heyComic flex-col text-center justify-center mt-1">
          <Link
            href={`/product/detail/${product.id}`}
            className="text-venetian-red text-[12px] md:text-xl truncate px-4"
          >
            {product.name.length > 20
              ? `${product.name.substring(0, 20)}...`
              : product.name}
          </Link>
          <section className="flex md:gap-2 justify-center items-center">
            <RatingStars
              rating={product.averageRating ?? 0}
              hexColor="#FFC648"
              disabled={true}
              variant={Size.small}
            />
            <p className="text-[10px] pl-2 md:text-sm mt-1 font-semibold text-primary-gray font-heyComic">
              {product.reviewCount ?? 0}{' '}
              {product.reviewCount === 1 ? 'review' : 'reviews'}
            </p>
          </section>
          <section className="flex gap-3 my-1 text-sm md:text-lg justify-center font-heyComic">
            <p>Rs. {product.discountedPrice}</p>
            <p className="text-secondary-venetican-red line-through">
              Rs. {product.price}
            </p>
          </section>
        </div>

        <div className="flex xs:flex-row flex-col font-heyComic gap-[0.3rem] sm:gap-3 justify-between sm:mx-3 md:mt-2 px-2">
          <BenefitsProductCardButton product={product} />
          <AddToCartProductCardButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
