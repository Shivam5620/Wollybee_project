import RatingStars from '../../../components/common/RatingStars';
import { IProduct } from '@repo/ui/types';
import { Size } from '@repo/ui/enums/size';
import { Chipbox } from '../../../../ui/components/ui/chipbox';
import ProductAddToCart from './ProductAddToCart';
import ShareButton from './ShareButton';
import { getAgesLabel } from '../../../components/common/common.utils';
import { CouponsCard } from '../../../components/cart/CouponCard';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';

// Server Component

const ProductDetailView = ({ product }: { product: IProduct }) => {
  const agesLabel = getAgesLabel(product.ages);

  return (
    <div className="md:w-[40%]">
      <div className="font-heyComic flex flex-col md:items-start items-center my-2 w-full">
        <div className="flex justify-between md:my-4 xs:my-2 my-1 md:gap-6 gap-2 items-center">
          <h1 className="text-4xl md:text-4xl md:text-left text-center text-primary-black">
            {product.name.length > 13
              ? `${product.name.substring(0, 13)}...`
              : product.name}
          </h1>

          <ShareButton
            shareData={{
              title: product.name,
              text: `Check out this new Game From Wollybee *${product.name}* !!! 🥰👌✨ \n\nLink:- `,
            }}
          />
        </div>
        <div className="flex items-center gap-4 md:mb-3 xs:mb-2 mb-0">
          <RatingStars
            rating={product.averageRating ?? 0}
            hexColor="#FFC648"
            disabled={true}
            variant={Size.medium}
          />
          <p className="text-md ml-2 mt-1 md:text-lg font-semibold opacity-40">
            {product.reviewCount ?? 0}{' '}
            {product.reviewCount === 1 ? 'review' : 'reviews'}
          </p>
        </div>
        <section className="flex gap-3 items-center py-2 font-helveticaRoundedBold lg:text-2xl md:text-lg">
          <p className=" font-bold">Rs. {product.discountedPrice}</p>
          <p className="text-red-500  font-bold line-through">
            Rs. {product.price}
          </p>
          <Chipbox
            label={`Save ${product.discountPercentage}%`}
            className="w-auto md:text-lg text-white bg-tertiary-green border-none py-4 inline-flex items-center px-4 font-helveticaRoundedBold rounded-full shadow-lg"
          />
        </section>
        <p className="italic font-helvetica text-primary-gray py-1">
          Inclusive of all taxes
        </p>
        <p className="text-secondary-color md:text-2xl text-xl my-1 lg:mb-8">
          {agesLabel} years | {product.minPlayers}-{product.maxPlayers} players
        </p>
        <div>
          <ProductAddToCart product={product} />
          <CouponsCard
            disabled={product.isComingSoon}
            className="w-[2/3] sm:w-full"
            filterId={product.id}
            viewOnly={true}
            cartItemsData={[]}
            label="Available Coupons"
            title="Apply Coupon at Checkout!"
          />
        </div>

        <div className="md:my-2 font-helveticaRoundedBold justify-center flex flex-col text-center md:text-left">
          <p className="py-2 text-primary-gray ">
            Free delivery on orders above Rs. 499/-
          </p>

          <div className="shadow-lg gap-3 justify-center rounded-lg py-2 grid grid-cols-12 font-helveticaRoundedBold mt-2 text-[16px] text-left px-5">
            <div className="col-span-4 flex items-center">
              <Image
                src={ICONS.deliveryIcon}
                alt="deliveryIcon"
                width={40}
                height={40}
              />
              <p className="pl-1 text-venetian-red">Delivery in 4-7 days</p>
            </div>

            <div className="col-span-4 flex items-center">
              <Image
                src={ICONS.returnIcon}
                alt="returnIcon"
                width={40}
                height={40}
              />
              <p className="pl-1 text-venetian-red">7 days return</p>
            </div>

            <div className="col-span-4 flex items-center">
              <Image
                src={ICONS.codAvailableIcon}
                alt="codIcon"
                width={40}
                height={40}
              />
              <p className="pl-1 text-venetian-red">COD available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
