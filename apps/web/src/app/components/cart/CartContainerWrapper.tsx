'use client';

import { Suspense, useEffect, useState } from 'react';
import CustomDrawer from '../common/CustomDrawer';
import CustomDialog from '../common/CustomDialog';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { ICartItemClient, ICartItemResponse } from '@repo/ui/types';
import { ProductDictionary } from './UserCartDetails';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useSession } from 'next-auth/react';
import { IAddress } from '@repo/ui/types/address';
import {
  setCartItems,
  setCartMyAddresses,
  setShowCartDrawer,
} from '@repo/ui/lib/features/cartSlice';
import { AddressType } from '@repo/ui/enums/address';
import { getProducts } from '../header/header.action';
import { getConfigurations } from './configuration.action';
import {
  setBanners,
  setConfigurations,
  setCoupons,
  setDealOfTheDay,
  setProducts,
} from '@repo/ui/lib/features/configurationSlice';
import CartModalSkeleton from '../skeleton/CartModalSkeleton';

const DynamicCartModal = dynamic(() => import('../cart/CartModal'));
const DynamicCartContainer = dynamic(() => import('../cart/CartContainer'));
const DynamicExitWithoutCheckout = dynamic(
  () => import('../cart/ExitWithoutCheckout'),
);

export const initialAddressState: IAddress = {
  fullName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'India',
  postalCode: '',
  additionalInstructions: '',
  type: AddressType.HOME,
  isDefault: false,
};

const CartContainerWrapper = ({
  myAddresses,
  cartItems = [],
}: {
  myAddresses: IAddress[];
  cartItems: ICartItemResponse[];
}) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { products } = useAppSelector((state) => state.configuration);
  const {
    cartItems: cartItemsState,
    showCartDrawer,
    showFeedbackModal,
    showCheckoutModal,
  } = useAppSelector((state) => state.cart);

  const [cartItemsData, setCartItemsData] = useState<ICartItemClient[]>([]);

  useEffect(() => {
    const fetchConfigurations = async () => {
      const res = await getConfigurations();
      if ('success' in res) {
        dispatch(setBanners(res.data.banners));
        dispatch(setProducts(res.data.products));
        dispatch(setDealOfTheDay(res.data.dealOfTheDayProductsResponse));
        dispatch(setCoupons(res.data.coupons));
        dispatch(setConfigurations(res.data.configurations));
      }
    };

    if (products.length === 0) {
      fetchConfigurations();
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (cartItems.length > 0) {
      dispatch(setCartItems(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    dispatch(setCartMyAddresses(myAddresses));
  }, [myAddresses]);

  useEffect(() => {
    const fetchData = async () => {
      // if products is somehow got cleared from state :
      let fetchproducts = [...products];
      if (products.length === 0) {
        const resProducts = await getProducts();
        if ('success' in resProducts && resProducts.success) {
          fetchproducts = resProducts.data;
        }
      }

      const productsMap: ProductDictionary = {};
      fetchproducts.forEach((a) => {
        productsMap[`${a.id}`] = {
          ...a,
        };
      });

      let cartItemsFiltered: ICartItemClient[] = [];
      cartItemsState?.forEach((cartItem) => {
        const currentProduct = productsMap[cartItem.productId];
        if (currentProduct) {
          cartItemsFiltered.push({
            ...currentProduct,
            quantity: cartItem.quantity,
            cartId: cartItem.id,
          });
        }
      });
      setCartItemsData(cartItemsFiltered);
    };

    fetchData();
  }, [products, cartItemsState, session]);

  return (
    <>
      <div className="relative">
        {cartItemsState.length > 0 ? (
          <Image
            onClick={() => {
              dispatch(setShowCartDrawer(true));
            }}
            alt="cartEmpty"
            height={15}
            className="block cursor-pointer xl:w-[60px] md:w-[55px] xs:w-[40px] w-[37px] -translate-y-0.5"
            src={ICONS.fillCartIcon}
            width={55}
          />
        ) : (
          <Image
            onClick={() => {
              dispatch(setShowCartDrawer(true));
            }}
            alt="cartEmpty"
            height={15}
            className="block cursor-pointer xl:w-[60px] md:w-[55px] xs:w-[40px] w-[37px] -translate-y-0.5"
            src={ICONS.emptyCardIcon}
            width={55}
          />
        )}

        {cartItemsState.length > 0 && (
          <span
            onClick={() => {
              dispatch(setShowCartDrawer(true));
            }}
            className="items-center absolute right-0 top-0 text-[8px] h-4 w-4 sm:text-xs pt-[2px] font-helveticaRoundedBold bg-primary-color text-white rounded-full sm:h-5 sm:w-5"
          >
            {cartItemsState.length}
          </span>
        )}
      </div>
      <CustomDrawer
        Component={<DynamicCartContainer cartItemsData={cartItemsData} />}
        open={showCartDrawer}
        side="right"
      />

      <CustomDialog
        className="h-full md:h-[537px] w-screen md:w-[710px] lg:w-[956px]"
        Component={
          <Suspense fallback={<CartModalSkeleton />}>
            <DynamicCartModal cartItemsData={cartItemsData} />
          </Suspense>
        }
        open={showCheckoutModal}
      />

      <CustomDialog
        className="rounded-xl h-[370px] sm:h-[400px] md:h-[380px] sm:w-[500px] w-[90%] md:w-[746px]"
        Component={<DynamicExitWithoutCheckout cartItemsData={cartItemsData} />}
        open={showFeedbackModal}
      />
    </>
  );
};

export default CartContainerWrapper;
