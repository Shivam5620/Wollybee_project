'use client';

import { useSession } from 'next-auth/react';
import { useAppDispatch } from '../../../lib/hooks';
import { addCartItem } from '../cart/cart.action';
import { IProduct } from '@repo/ui/types';
import { toast } from '../../../ui/components/ui/use-toast';
import { Button } from '../../../ui/components/ui/button';
import { addToCart, setLoading } from '@repo/ui/lib/features/cartSlice';
import { CartAction } from '@repo/ui/enums/cart';
import { useState } from 'react';
import CustomDialog from '../common/CustomDialog';
import ComingSoonModal from './ComingSoonModal';

const AddToCartMobileProductCardButton = ({
  product,
}: {
  product: IProduct;
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
        disabled={product.isComingSoon}
        size="xs"
        className={`rounded-full text-[11px] w-full border-2 bg-white ${product.isComingSoon ? 'border-tertiary-green' : 'border-secondary-color'} ${product.isComingSoon ? 'text-tertiary-green' : 'text-secondary-color'} hover:${product.isComingSoon ? 'bg-tertiary-green' : 'bg-secondary-color'} hover:text-white`}
        onClick={
          product.isComingSoon
            ? () => setShowComingSoon(true)
            : handleAddToCartClick
        }
      >
        {product.isComingSoon ? 'Coming Soon' : 'Add to Basket'}
      </Button>
    </>
  );
};

export default AddToCartMobileProductCardButton;
