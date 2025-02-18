'use client';

import { useSession } from 'next-auth/react';
import { Button } from '../../../../ui/components/ui/button';
import { useAppDispatch } from '../../../../lib/hooks';
import { useState } from 'react';
import { IProduct } from '@repo/ui/types';
import { toast } from '../../../../ui/components/ui/use-toast';
import { addCartItem } from '../../../components/cart/cart.action';
import { addToCart } from '@repo/ui/lib/features/cartSlice';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { CartAction } from '@repo/ui/enums/cart';

const ProductAddToCart = ({ product }: { product: IProduct }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(1);

  const handleAddToCartClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (product.isComingSoon) {
      return;
    }

    if (session?.user?.id) {
      const res = await addCartItem({
        productId: product.id,
        quantity: count,
        action: CartAction.ADD,
      });

      if ('error' in res) {
        toast({ title: res.error.message, variant: 'destructive' });
      }
      if ('success' in res) {
        dispatch(
          addToCart({
            id: product.id,
            productId: product.id,
            quantity: count,
          }),
        );
        toast({ title: res.message });
      }
    } else {
      dispatch(
        addToCart({
          id: product.id,
          productId: product.id,
          quantity: count,
        }),
      );
      toast({
        title: 'Added to Basket!',
      });
    }
    setCount(1);
  };

  return (
    <div className="py-2 flex items-center gap-5">
      <Button
        disabled={product.isComingSoon}
        id={`add-to-basket-button-product-detail-page-${product.id}`}
        onClick={handleAddToCartClick}
        size={'lg'}
        className="block rounded-full w-56 text-center bg-white text-2xl border-2 border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-white"
      >
        Add to Basket
      </Button>
      <div className="flex gap-3 items-center">
        <Image
          className="cursor-pointer"
          src={ICONS.decreaseCountIcon}
          onClick={() => {
            if (count > 1) {
              setCount(count - 1);
            }
          }}
          alt="share"
          width={30}
          height={30}
        />
        <p className="text-2xl font-helveticaRoundedBold">{count}</p>
        <Image
          className="cursor-pointer"
          src={ICONS.increaseCountIcon}
          alt="share"
          width={30}
          onClick={() => {
            setCount(count + 1);
          }}
          height={30}
        />
      </div>
    </div>
  );
};

export default ProductAddToCart;
