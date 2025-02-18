import Image from 'next/image';
import Sandwich from '../common/Sandwich';
import CartItem from './CartItem';
import { useEffect, useState } from 'react';
import { Button } from '../../../ui/components/ui/button';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { CouponsCard } from './CouponCard';
import { SimpleCarousel } from '../common/CustomCarousel';
import { Slider } from '../../../ui/components/ui/slider';
import { ICartItemClient, IProduct } from '@repo/ui/types';
import { deleteCart } from './cart.action';
import { toast } from '../../../ui/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import {
  applyCouponUpdateCart,
  clearCart,
  resetCouponApplied,
  setLoading,
  setShowCartCheckoutModal,
  setShowCartDrawer,
} from '@repo/ui/lib/features/cartSlice';
import PeopleBoughtMobile from './PeopleBoughtMobile';
import CouponApplied from './CouponApplied';
import { ICONS, navBarRoutesClient } from '@repo/ui/lib/constants';
import { IValidateCoupon, validateCoupon } from '../../lib/action';
import LoadingBar from '../common/LoadingBar';
import { BannerType } from '@repo/ui/enums/banner';
import Link from 'next/link';

function Header({ total }: { total: number }) {
  const dispatch = useAppDispatch();
  const { banners, freeShippingCartValue } = useAppSelector(
    (state) => state.configuration,
  );
  const { couponsModalOpen } = useAppSelector((state) => state.cart);

  const [showBanners, setShowBanners] = useState<boolean>(false);

  useEffect(() => {
    const filteredBanners = banners.filter((a) => {
      return a.type === BannerType.cart;
    });
    if (filteredBanners.length > 0) {
      setShowBanners(true);
    } else {
      setShowBanners(false);
    }
  }, [banners]);

  return (
    <>
      <div
        className={`flex justify-between relative ${couponsModalOpen ? 'blur-sm opacity-45' : ''}`}
      >
        <h1 className="font-heyComic md:text-2xl text-xl text-primary-black mt-2 pb-1 mx-auto">
          Your Basket
        </h1>
        <Image
          alt="closeIcon"
          className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
          src={ICONS.closeIcon}
          width={40}
          height={40}
          onClick={() => {
            dispatch(setShowCartDrawer(false));
          }}
        />
      </div>
      {showBanners && (
        <div
          className={`mb-1 overflow-hidden max-h-[100px] ${couponsModalOpen ? 'blur-sm opacity-45' : ''}`}
        >
          <SimpleCarousel
            carouselId="banner-carousel"
            data={banners.filter((a) => {
              return a.type === BannerType.cart;
            })}
            Component={(a) => (
              <Image
                key={a.file.url}
                className="w-full cursor-pointer h-auto"
                width={1440}
                height={80}
                alt="banner"
                src={a.file.url}
              />
            )}
          />
        </div>
      )}

      <div className="py-2 text-center px-3 shadow-lg drop-shadow-md">
        <p className="font-heyComic md:text-base text-sm text-primary-black">
          {total < freeShippingCartValue
            ? `Add Rs.${freeShippingCartValue - total} more for FREE Delivery !`
            : `Hurray!!!! Free Delivery `}
        </p>
        {total != 0 && total < freeShippingCartValue && (
          <div className="py-4">
            <Slider
              thumbIcon={true}
              value={[total]}
              max={freeShippingCartValue}
              step={freeShippingCartValue}
            />
          </div>
        )}
      </div>
    </>
  );
}

function SeeAllItemsHeader({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="ml-2 flex gap-2">
        <Image
          priority
          alt="backIcon"
          className="cursor-pointer"
          src={ICONS.leftArrow}
          width={20}
          height={20}
          onClick={() => onClose()}
        />
        <h1 className="font-heyComic text-xl text-primary-black mt-2 pb-1">
          Back to Basket
        </h1>
      </div>
    </>
  );
}

function Content({
  showAllProducts,
  cartItemsData = [],
  setShowAllProducts,
}: {
  showAllProducts: boolean;
  cartItemsData: ICartItemClient[];
  setShowAllProducts: (val: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { couponsModalOpen } = useAppSelector((state) => state.cart);

  const handleClearCart = async () => {
    if (session?.user?.id) {
      dispatch(setLoading(true));
      const res = await deleteCart();
      dispatch(setLoading(false));
      if ('success' in res) {
        dispatch(clearCart());
      }
      if ('error' in res) {
        toast({ title: res.error.message, variant: 'destructive' });
      }
    } else {
      // Clear the cart from state
      dispatch(clearCart());
      toast({ title: 'Basket Cleared' });
    }
  };

  return (
    <>
      {cartItemsData.length != 0 && (
        <div
          className={`${couponsModalOpen ? 'blur-sm opacity-45' : ''} font-heyComic md:text-md text-sm text-primary-gray ${showAllProducts ? 'justify-end' : 'justify-between'} px-3 pt-1 flex`}
        >
          {!showAllProducts && (
            <p
              onClick={() => {
                setShowAllProducts(true);
              }}
              className="cursor-pointer"
            >
              See all
            </p>
          )}
          <p className="cursor-pointer" onClick={handleClearCart}>
            Clear all
          </p>
        </div>
      )}

      <div className="no-scrollbar flex flex-col gap-2 mt-4">
        {cartItemsData.map((a) => (
          <CartItem data={a} />
        ))}
      </div>

      {cartItemsData.length == 0 && (
        <div className="flex flex-col justify-center w-full mx-auto text-center font-heyComic">
          <p className="text-primary-black py-1">Your basket is empty !</p>
          <p className="text-primary-gray text-xs">
            "Fill your basket with wollybee’s playtime treasures!"
          </p>
          <Link
            onClick={() => {
              dispatch(setShowCartDrawer(false));
            }}
            href={navBarRoutesClient.shopAll}
          >
            <Button className="w-[80%] text-lg mx-auto rounded-full transition-all hover:scale-110 bg-secondary-color hover:bg-secondary-color my-5 text-white">
              Shop Now
            </Button>
          </Link>
        </div>
      )}
      <h1
        className={`font-heyComic text-xl md:text-2xl text-secondary-color text-center mt-4`}
      >
        Parents also bought
      </h1>
      <PeopleBoughtMobile />
    </>
  );
}

function Footer({
  cartItemsData,
  total,
}: {
  cartItemsData: ICartItemClient[];
  total: number;
}) {
  const dispatch = useAppDispatch();
  const { coupon, couponsModalOpen, discountedAmount, isCouponApplied } =
    useAppSelector((state) => state.cart);

  const { shippingCharges, freeShippingCartValue } = useAppSelector(
    (state) => state.configuration,
  );

  useEffect(() => {
    const applyCoupon = async () => {
      const payload: IValidateCoupon = {
        items: cartItemsData.map((a) => {
          return { productId: a.id, quantity: a.quantity };
        }),
        coupon,
      };
      dispatch(setLoading(true));
      const res = await validateCoupon(payload);
      dispatch(setLoading(false));
      if (res.success) {
        dispatch(applyCouponUpdateCart(res.data));
      }
      if (res.error) {
        dispatch(resetCouponApplied());
      }
    };

    if (isCouponApplied) {
      applyCoupon();
    }
  }, [cartItemsData, coupon]);

  return (
    <div className="[box-shadow:0_0_15px_rgba(0,0,0,0.18)] [clip-path:inset(-15px_0px_0px_0px)] rounded-tr-2xl rounded-tl-2xl ">
      <div className="flex gap-4 justify-between px-7 ">
        <CouponsCard cartItemsData={cartItemsData} label="Apply Coupons" />
      </div>

      <div
        className={`rounded-3xl rounded-bl-none rounded-br-none px-2 ${couponsModalOpen ? 'blur-sm opacity-45' : ''}`}
      >
        <CouponApplied />
        <section className="text-xl font-heyComic justify-between flex mx-3 mb-2">
          <p>Subtotal</p>
          {isCouponApplied && (
            <p className="font-heyComic">Rs. {discountedAmount}</p>
          )}
          <p className={` ${isCouponApplied && 'line-through'} font-heyComic`}>
            Rs. {total}
          </p>
        </section>

        <section className="text-xl font-heyComic justify-between flex mx-3 mb-2">
          <p>Shipping</p>
          <p className={`font-heyComic`}>
            Rs. {total > freeShippingCartValue ? 0 : shippingCharges}
          </p>
        </section>

        <Button
          disabled={cartItemsData.length == 0}
          onClick={() => {
            dispatch(setShowCartCheckoutModal(true));
          }}
          className="md:text-2xl text-xl rounded-full mb-2 w-full hover:bg-primary-color cursor-pointer bg-secondary-color text-white font-heyComic h-auto md:py-4 py-3 flex gap-4"
        >
          Checkout
          <svg
            width="59"
            height="32"
            viewBox="0 0 59 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="43" cy="16" r="16" fill="#BDF7FF" />
            <circle cx="28" cy="16" r="16" fill="white" />
            <circle cx="16" cy="16" r="16" fill="#9662AF" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

const CartContainer = ({
  cartItemsData,
}: {
  cartItemsData: ICartItemClient[];
}) => {
  const { loading } = useAppSelector((state) => state.cart);
  const [seeAllProductsView, setSeeAllProductsView] = useState(false);

  const [currentTotal, setCurrentTotal] = useState(0);

  useEffect(() => {
    let total: number = 0;
    cartItemsData.forEach((a) => {
      total += a.discountedPrice * a.quantity;
    });
    setCurrentTotal(total);
  }, [cartItemsData]);

  if (seeAllProductsView) {
    return (
      <>
        {loading && <LoadingBar />}
        <Sandwich
          content={
            <Content
              showAllProducts={seeAllProductsView}
              cartItemsData={cartItemsData}
              setShowAllProducts={setSeeAllProductsView}
            />
          }
          footer={<></>}
          header={
            <SeeAllItemsHeader onClose={() => setSeeAllProductsView(false)} />
          }
        />
      </>
    );
  }

  return (
    <>
      {loading && <LoadingBar />}

      <Sandwich
        content={
          <Content
            showAllProducts={seeAllProductsView}
            cartItemsData={cartItemsData}
            setShowAllProducts={setSeeAllProductsView}
          />
        }
        footer={<Footer cartItemsData={cartItemsData} total={currentTotal} />}
        header={<Header total={currentTotal} />}
      />
    </>
  );
};

export default CartContainer;
