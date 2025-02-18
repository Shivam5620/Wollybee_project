'use client';

import { useSession } from 'next-auth/react';
import { useAppDispatch } from '../../../lib/hooks';
import { addCartItem } from '../cart/cart.action';
import { IProduct } from '@repo/ui/types';
import { toast } from '../../../ui/components/ui/use-toast';
import { Button } from '../../../ui/components/ui/button';
import { addToCart, setLoading } from '@repo/ui/lib/features/cartSlice';
import { CartAction } from '@repo/ui/enums/cart';
import CustomDialog from '../common/CustomDialog';
import ComingSoonModal from './ComingSoonModal';
import { useState } from 'react';

const AddToCartProductCardButton = ({
  product,
  benefitsbutton = false,
}: {
  product: IProduct;
  benefitsbutton?: boolean;
}) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const [showComingSoon, setShowComingSoon] = useState<boolean>(false);

  const handleAddToCartClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (product.isComingSoon) {
      return;
    }

    if (session?.user?.id) {
      dispatch(setLoading(true));
      const res = await addCartItem({
        productId: product.id,
        quantity: 1,
        action: CartAction.ADD,
      });
      dispatch(setLoading(false));
      if ('error' in res) {
        toast({ title: res.error.message, variant: 'destructive' });
      }
      if ('success' in res) {
        dispatch(
          addToCart({
            id: product.id,
            productId: product.id,
            quantity: 1,
          }),
        );
        toast({ title: res.message });
      }
    } else {
      dispatch(
        addToCart({
          id: product.id,
          productId: product.id,
          quantity: 1,
        }),
      );
      toast({
        title: 'Added to Basket!',
      });
    }
  };

  if (product.isComingSoon) {
    return (
      <>
        <CustomDialog
          className="rounded-2xl sm:rounded-2xl md:rounded-2xl overflow-scroll sm:w-[35%]"
          open={showComingSoon}
          Component={
            <ComingSoonModal
              onClose={() => {
                setShowComingSoon(false);
              }}
              product={product}
            />
          }
        />

        <Button
          size="sm"
          onClick={() => {
            setShowComingSoon(true);
          }}
          className="rounded-full font-heyComic sm:h-10 lg:h-12 md:text-base xs:text-xs text-[0.85rem] w-full border-2 border-tertiary-green text-tertiary-green bg-white hover:bg-tertiary-green hover:text-white"
        >
          Notify
        </Button>
      </>
    );
  }

  return (
    <>
      {!benefitsbutton ? (
        <Button
          size="sm"
          onClick={handleAddToCartClick}
          className="rounded-full font-heyComic sm:h-10 lg:h-12 md:text-base xs:text-xs text-[0.85rem] w-full border-2 border-secondary-color text-secondary-color bg-white hover:bg-secondary-color hover:text-white"
        >
          Add to Basket
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={handleAddToCartClick}
          className="rounded-full justify-between font-heyComic md:text-base xs:text-xs text-[0.85rem] bg-white w-full border-2 border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-white"
        >
          <p>Rs. {product.discountedPrice}</p>
          <p className="flex gap-2 items-center">
            Add to Basket
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.57031 6.85733H11.457"
                stroke="white"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M9.66797 4.99893L11.4967 6.49652C11.7241 6.67939 11.7241 7.03031 11.4967 7.21318L9.66797 8.68605"
                stroke="white"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </svg>
          </p>
        </Button>
      )}
    </>
  );
};

export default AddToCartProductCardButton;
