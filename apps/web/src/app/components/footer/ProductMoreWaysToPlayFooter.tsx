import { ICONS } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import Image from 'next/image';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import ProductMoreWaysToPlay from '../../product/detail/[productId]/ProductMoreWaysToPlay';

export const ProductMoreWaysToPlayFooter = ({
  product,
  className,
}: {
  product: IProduct;
  className: ClassNameValue;
}) => {
  return (
    <div className={twMerge('', className)}>
      <div className="mt-5">
        <Image
          alt="wave"
          src={ICONS.greenWave}
          width={100}
          height={100}
          className="w-full translate-y-2 "
        />
      </div>
      <div className="bg-tertiary-green justify-center md:px-10 px-4 pb-5">
        <ProductMoreWaysToPlay
          description={product.moreWaysToPlayDescription}
          url={product.moreWaysToPlayUrl}
        />
      </div>
    </div>
  );
};
