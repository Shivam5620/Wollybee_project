'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BottomNavMenu from './components/mobileNav/BottomNavMenu';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { Button } from '../ui/components/ui/button';
import { useSession } from 'next-auth/react';
import {
  addToCart,
  setLoading,
  setShowCartDrawer,
} from '@repo/ui/lib/features/cartSlice';
import { addCartItem } from './components/cart/cart.action';
import { CartAction } from '@repo/ui/enums/cart';
import { toast } from '../ui/components/ui/use-toast';

const MobileBottomNavContainer = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { products } = useAppSelector((state) => state.configuration);
  const { product } = useAppSelector((state) => state.product);

  const [priceToShow, setPriceToShow] = useState<number>(0);

  const isCartEmpty = cartItems.length <= 0;
  const [showAddToBasket, setShowAddToBasket] = useState<boolean>(false);
  const pathname = usePathname();
  const isProductPage = pathname.split('/').includes('product', 1);

  const productId = pathname.split('/').slice(-1)[0];
  useEffect(() => {
    const handleScroll = () => {
      const addToBasketButton = document.getElementById(
        `add-to-basket-button-product-detail-page-${productId}`,
      );
      if (!addToBasketButton) return;
      const addToBasketPosition = addToBasketButton.getBoundingClientRect();
      const isAddToBasketInView =
        addToBasketPosition.top >= 0 &&
        addToBasketPosition.bottom <= window.innerHeight;
      setShowAddToBasket(!isAddToBasketInView);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [productId]);

  useEffect(() => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((a) => {
        const productFound = products.find((b) => b.id === a.productId);
        if (productFound) {
          totalPrice += productFound.discountedPrice * a.quantity;
        }
      });
      setPriceToShow(totalPrice);
    }
  }, [cartItems]);

  const handleAddToCartClick = async () => {
    if (!product) {
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
    <div className="">
      {isProductPage && product && !product.isComingSoon && (
        <div
          className={`rounded rounded-t-2xl rounded-b-none md:hidden ${!showAddToBasket && isCartEmpty ? 'translate-y-[500px]' : 'translate-y-0 border-b-[1px]'} [transition:all_cubic-bezier(0.4,_0,_0.2,_1)_.7s]  [box-shadow:0_0_15px_rgba(0,0,0,0.25)] [clip-path:inset(-15px_0px_0px_0px)] fixed bottom-[4.3rem] w-full z-[30] bg-white px-6 py-3 flex justify-between items-center font-helveticaRoundedBold`}
        >
          <p className="text-primary-black font-heyComic text-xl">
            Rs.{product?.discountedPrice}
          </p>

          <Button
            className="hover:bg-secondary-color bg-white text-lg px-5 py-[6px] rounded-full border-2 border-secondary-color text-secondary-color font-heyComic hover:text-white"
            onClick={handleAddToCartClick}
          >
            Add to Basket
          </Button>
        </div>
      )}
      <div
        className={`rounded rounded-t-2xl rounded-b-none md:hidden ${isCartEmpty ? 'translate-y-[500px]' : 'translate-y-0 border-b-[1px]'} [transition:all_cubic-bezier(0.4,_0,_0.2,_1)_.7s]  [box-shadow:0_0_15px_rgba(0,0,0,0.25)] [clip-path:inset(-15px_0px_0px_0px)] fixed bottom-[4.3rem] w-full z-[30] bg-white px-6 py-3 flex justify-between items-center font-helveticaRoundedBold`}
      >
        <p className=" text-primary-black text-xl font-heyComic">
          Rs. {priceToShow}
        </p>

        <Button
          className="text-lg px-5 py-[6px] hover:bg-primary-color rounded-full bg-secondary-color font-heyComic text-white"
          onClick={() => {
            dispatch(setShowCartDrawer(true));
          }}
        >
          View Basket{' '}
          <span className="font-heyComic pl-1">({cartItems.length})</span>
        </Button>
      </div>

      <BottomNavMenu
        isCartEmpty={isCartEmpty}
        showAddToBasket={showAddToBasket}
      />
    </div>
  );
};

export default MobileBottomNavContainer;
