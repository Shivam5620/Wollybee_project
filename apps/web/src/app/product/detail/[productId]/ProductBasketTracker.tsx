'use client';
import { useEffect, useState } from 'react';
import { Button } from '../../../../ui/components/ui/button';
import { IProduct } from '@repo/ui/types';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { useAppDispatch } from '../../../../lib/hooks';
import { addToCart } from '@repo/ui/lib/features/cartSlice';
import { addCartItem } from '../../../components/cart/cart.action';
import { useSession } from 'next-auth/react';
import { toast } from '../../../../ui/components/ui/use-toast';
import { CartAction } from '@repo/ui/enums/cart';

const ProductBasketTracker = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [showBanner, setShowBanner] = useState(false);
  const [count, setCount] = useState(1);

  const handleAddToCartClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
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

  useEffect(() => {
    if (!window) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

    if (isMobile) return;

    const handleScroll = () => {
      const addToBasketButton = document.getElementById(
        `add-to-basket-button-product-detail-page-${product?.id}`,
      );
      if (!addToBasketButton) return;
      const addToBasketPosition = addToBasketButton.getBoundingClientRect();
      const isAddToBasketInView =
        addToBasketPosition.top >= 0 &&
        addToBasketPosition.bottom <= window.innerHeight;
      setShowBanner(!isAddToBasketInView);
      const headerElement = document.getElementById('wollybee-header');
      if (headerElement) {
        if (isAddToBasketInView) {
          headerElement.classList.remove('hidden');
        } else {
          headerElement.classList.add('hidden');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      const headerElement = document.getElementById('wollybee-header');
      if (headerElement) {
        headerElement.classList.remove('hidden');
      }
    };
  }, []);

  return showBanner ? (
    <>
      <div className="sm:flex hidden items-center fixed top-0 left-0 right-0 backdrop-blur-sm py-3 bg-white shadow-md justify-between z-50 px-10">
        <div className="flex gap-5">
          <p className="text-xl font-heyComic">{product.name}</p>
          <p className="text-xl text-secondary-color font-helveticaRoundedBold">
            Rs. {product.discountedPrice}
          </p>
        </div>

        <div className="flex gap-5 items-center">
          <Image
            className="cursor-pointer"
            src={ICONS.decreaseCountIcon}
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
            alt="share"
            width={25}
            height={25}
          />
          <p className="text-2xl font-helveticaRoundedBold">{count}</p>
          <Image
            className="cursor-pointer"
            src={ICONS.increaseCountIcon}
            alt="share"
            width={25}
            onClick={() => {
              setCount(count + 1);
            }}
            height={25}
          />
          <Button
            disabled={product.isComingSoon}
            onClick={handleAddToCartClick}
            className="font-heyComic rounded-full p-5 border-2 border-secondary-color text-secondary-color bg-white hover:bg-secondary-color hover:text-white"
          >
            Add to Basket
          </Button>
        </div>
      </div>
    </>
  ) : null;
};

export default ProductBasketTracker;
