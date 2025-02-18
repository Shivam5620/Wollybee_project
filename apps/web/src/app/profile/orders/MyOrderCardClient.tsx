'use client';

import Image from 'next/image';
import React from 'react';
import { ProductDictionary } from '../../components/cart/UserCartDetails';
import { IOrder } from '@repo/ui/types/order';
import Link from 'next/link';
import { ICONS, navBarRoutesClient, routes } from '@repo/ui/lib';
import { MultipleItemsCarousel } from '../../components/common/CustomCarousel';
import { IndianRupee, Link2 } from 'lucide-react';
import { IFile } from '@repo/ui/types/file';
import { Button } from '../../../ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../../lib/hooks';
import { setCartItems, setLoading } from '@repo/ui/lib/features/cartSlice';
import { CartAction } from '@repo/ui/enums/cart';
import {
  bulkAddCartItem,
  getCartItems,
} from '../../components/cart/cart.action';
import { toast } from '../../../ui/components/ui/use-toast';

const OrderImageComponent = ({ image, id }: { image: IFile; id: number }) => {
  const router = useRouter();
  return (
    <div className=" flex justify-center">
      <div className="px-7  py-5 md:p-5 min-w-[200px] max-w-[250px] rounded-3xl bg-gray-light-bg flex flex-col items-center gap-4">
        <Image
          src={image.url}
          alt="Product image"
          className="overflow-hidden max-w-[200px] max-h-[200px] aspect-auto  rounded-2xl w-full"
          width={500}
          height={500}
        />
        <Button
          onClick={() => {
            router.push(`${routes.productDetail}/${id}#product-detail-reviews`);
          }}
          className="w-full px-4 text-xs xs:text-[16px] py-2.5 bg-secondary-color rounded-full text-white font-heyComic"
        >
          Write a Review
        </Button>
      </div>
    </div>
  );
};

const MyOrderCardClient = ({
  order,
  productsMap,
}: {
  order: IOrder;
  productsMap: ProductDictionary;
}) => {
  const dispatch = useAppDispatch();
  const images = order.items.map((a) => {
    const product = productsMap[a?.product?.id ?? 0];
    return {
      image: product.images[0],
      id: product.id,
    };
  });

  const handleOrderAgainClicked = async () => {
    dispatch(setLoading(true));
    const bulkProducts = order.items.map((a) => {
      return {
        action: CartAction.ADD,
        productId: a.product?.id ?? -1,
        quantity: a.quantity,
      };
    });
    dispatch(setLoading(true));
    const res = await bulkAddCartItem(bulkProducts);
    if ('success' in res) {
      toast({
        title: res.message,
      });
      const resGetCartItems = await getCartItems();
      if ('success' in resGetCartItems) {
        dispatch(setCartItems(resGetCartItems.data));
      }
      if ('error' in resGetCartItems) {
        toast({
          title: resGetCartItems.error.message,
        });
      }
    }
    if ('error' in res) {
      toast({
        title: res.error.message,
        variant: 'destructive',
      });
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="my-5 bg-white shadow-[0px_2px_15px_0px_#00000018] rounded-3xl px-4 md:px-6 py-4">
      <div className="font-helveticaRoundedBold flex justify-between mb-1">
        <p className=" text-gray-light-text text-base xs:text-2xl">
          Order ID: {order.id}
        </p>
        <p className=" text-tertiary-green text-sm xs:text-xl">
          {new Date(order.createdAt).toDateString()}
        </p>
      </div>
      <Link
        className=" text-secondary-color font-helveticaRoundedBold text-sm xs:text-xl"
        href={`${navBarRoutesClient.thankyou}?id=${order.id}`}
      >
        Track Your Order{' '}
        <Link2 className="inline-block -rotate-45 w-[15px] xs:w-[20px] " />
      </Link>
      <div className=" px-[5%] xs:px-0 mt-5">
        <MultipleItemsCarousel
          data={images}
          leftArrowClassName="p-2"
          rightArrowClassName="p-2"
          Component={OrderImageComponent}
          carouselId={`order-carousel-${order.id}`}
          defaultSlidesPerView={2}
          slidesPerView={3}
          minComponentNeeded={3}
          componentLeftAlign={false}
          arrows={{
            left: ICONS.carouselArrows.grayLeft,
            right: ICONS.carouselArrows.grayRight,
          }}
          loop={false}
          oneViewOnMobile={true}
          className="xs:w-auto w-[15px]"
        />
      </div>

      <div className="font-helveticaRoundedBold flex justify-between items-center mt-10">
        <p className=" text-base xs:text-2xl">
          <span className="font-heyComic">
            Total <span className="hidden xs:inline">Order Amount</span> :
          </span>
          <IndianRupee className="inline-block w-[17px] xs:w-[25px]" />
          {order.totalAmount}
        </p>
        <Button
          onClick={handleOrderAgainClicked}
          className="font-heyComic hover:bg-secondary-color bg-primary-color px-4 py-1.5 text-sm xs:text-xl text-white rounded-full"
        >
          Order Again
        </Button>
      </div>
    </div>
  );
};

export default MyOrderCardClient;
