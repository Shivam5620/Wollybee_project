'use client';
import Image from 'next/image';
import { Button } from '../../../ui/components/ui/button';
import { OrdersSummaryCard } from './OrderSummary';
import { CouponsCard } from './CouponCard';
import Sandwich from '../common/Sandwich';
import { useState } from 'react';
import { ICONS, navBarRoutesClient } from '@repo/ui/lib';
import { ICartItemClient } from '@repo/ui/types';
import { IAddress } from '@repo/ui/types/address';
import { IOrderRequestBody, IPaymentPayload } from '@repo/ui/types/order';
import { createOrder, handlePayment } from './order.action';
import { toast } from '../../../ui/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useSession } from 'next-auth/react';
import { deleteCart } from './cart.action';
import {
  clearCart,
  setAddAddressView,
  setCartMyAddresses,
  setEditAddressView,
  setLoading,
  setPaymentMode,
  setShowCartCheckoutModal,
  setShowCartDrawer,
  setShowCartFeedbackModal,
  setShowPaymentView,
} from '@repo/ui/lib/features/cartSlice';
import { useRouter } from 'next/navigation';
import { AddressCheckoutContainer } from './ViewAddresses';
import { Checkbox } from '../../../ui/components/ui/checkbox';
import { initialAddressState } from './CartContainerWrapper';
import { OrderPaymentMode } from '@repo/ui/enums/order';
import AddressContainer from '../../profile/address/AddressContainer';
import {
  addAddress,
  getUserAddress,
  updateAddress,
} from '../../profile/address/address.action';
import { validateAddressPayload } from '../../profile/address/address.utils';
import { CartContentSkeleton } from '../skeleton/CartModalSkeleton';

export function UserDetailsHeader() {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { showAddAddress, showEditAddress, showPaymentView } = useAppSelector(
    (state) => state.cart,
  );

  const handleBackClick = () => {
    if (session && session.user.id) {
      if (showPaymentView) {
        dispatch(setShowPaymentView(false));
        dispatch(setEditAddressView(false));
        dispatch(setAddAddressView(false));
      } else if (showAddAddress || showEditAddress) {
        dispatch(setEditAddressView(false));
        dispatch(setAddAddressView(false));
      } else {
        dispatch(setShowCartCheckoutModal(false));
        dispatch(setShowCartFeedbackModal(true));
      }
    } else {
      if (showPaymentView) {
        dispatch(setShowPaymentView(false));
      } else {
        dispatch(setShowCartCheckoutModal(false));
        dispatch(setShowCartFeedbackModal(true));
      }
    }
  };

  return (
    <>
      <div className="flex gap-2 mx-4 my-3">
        <Image
          className="hidden md:block cursor-pointer mr-2"
          onClick={handleBackClick}
          src={ICONS.backIcon}
          alt="back"
          width={16}
          height={16}
        />
        <Image
          onClick={handleBackClick}
          className="md:hidden"
          src={ICONS.backIcon}
          alt="back"
          width={16}
          height={16}
        />
        <Image
          src={ICONS.wollyBeeLogoAndText}
          alt="wollybee checkout"
          width={120}
          height={30}
        />
      </div>
      <div className="flex gap-8 pb-3 px-2 text-lg font-heyComic justify-center text-primary-black shadow-md">
        <p
          className={`cursor-pointer ${!showPaymentView && 'decoration-wavy underline decoration-primary-color underline-offset-8'}`}
        >
          Address
        </p>

        <p
          className={`cursor-pointer ${showPaymentView && 'decoration-wavy underline decoration-primary-color underline-offset-8'}`}
        >
          Pay
        </p>
      </div>
    </>
  );
}

export function UserDetailContent({
  paymentMethod,
  setPaymentMethod,
  addressDetail,
  onAddressChange,
  cartItemsData,
}: {
  paymentMethod: OrderPaymentMode;
  setPaymentMethod: (paymentMethod: OrderPaymentMode) => void;
  addressDetail: IAddress;
  onAddressChange: (address: IAddress) => void;
  cartItemsData: ICartItemClient[];
}) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { showPaymentView, loading } = useAppSelector((state) => state.cart);

  if (loading) {
    return <CartContentSkeleton />;
  }

  if (showPaymentView) {
    return (
      <>
        <div className="p-5">
          <h1 className="font-heyComic text-primary-gray py-3">
            Select Payment Method{' '}
          </h1>
          <section className="flex gap-3 py-2">
            <Checkbox
              className="w-5 h-5 border-primary-color border rounded-full"
              checked={paymentMethod === OrderPaymentMode.CASH_ON_DELIVERY}
              onCheckedChange={() => {
                setPaymentMethod(OrderPaymentMode.CASH_ON_DELIVERY);
                dispatch(setPaymentMode(OrderPaymentMode.CASH_ON_DELIVERY));
              }}
            />{' '}
            <span
              onClick={() => {
                setPaymentMethod(OrderPaymentMode.CASH_ON_DELIVERY);
                dispatch(setPaymentMode(OrderPaymentMode.CASH_ON_DELIVERY));
              }}
              className="font-heyComic text-primary-black cursor-pointer"
            >
              Pay on Delivery
            </span>
          </section>

          <section className="flex gap-3 py-2">
            <Checkbox
              className="w-5 h-5 rounded-full border border-primary-color"
              checked={paymentMethod === OrderPaymentMode.ONLINE}
              onCheckedChange={() => {
                setPaymentMethod(OrderPaymentMode.ONLINE);
                dispatch(setPaymentMode(OrderPaymentMode.ONLINE));
              }}
            />{' '}
            <span
              onClick={() => {
                setPaymentMethod(OrderPaymentMode.ONLINE);
                dispatch(setPaymentMode(OrderPaymentMode.ONLINE));
              }}
              className="font-heyComic text-primary-black cursor-pointer"
            >
              Pay Online
            </span>
          </section>
        </div>
      </>
    );
  }

  if (session && session.user.id) {
    return (
      <>
        <div className="md:hidden px-4">
          <OrdersSummaryCard
            cartItemsData={cartItemsData}
            label="Order Summary"
          />
        </div>
        <div className="md:hidden mb-2 px-4">
          <CouponsCard
            cartItemsData={cartItemsData}
            label="Enter Coupon code"
          />
        </div>
        <AddressCheckoutContainer setAddressDetails={onAddressChange} />
      </>
    );
  }

  return (
    <div className="h-[110px] sm:py-2">
      <div className="md:hidden px-4">
        <OrdersSummaryCard
          cartItemsData={cartItemsData}
          label="Order Summary"
        />
      </div>
      <div className="md:hidden mb-2 px-4">
        <CouponsCard cartItemsData={cartItemsData} label="Enter Coupon code" />
      </div>
      <AddressContainer
        setAddress={(value: IAddress) => {
          onAddressChange(value);
        }}
        address={addressDetail}
        isModal={false}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
}

export function UserDetailFooter({
  paymentMethod,
  addressDetail,
  cartItemsData,
}: {
  paymentMethod: OrderPaymentMode;
  addressDetail: IAddress;
  cartItemsData: ICartItemClient[];
}) {
  const dispatch = useAppDispatch();
  const {
    coupon,
    isCouponApplied,
    showEditAddress,
    showAddAddress,
    showPaymentView,
  } = useAppSelector((state) => state.cart);
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddAddress = async (address: IAddress) => {
    if (!validateAddressPayload(address)) {
      toast({ title: 'All fields are mandatory', variant: 'destructive' });
      return;
    }
    const res = await addAddress(address);
    if ('error' in res) {
      toast({ title: res.error.message, variant: 'destructive' });
    }
    if ('success' in res) {
      toast({ title: res.message });
      dispatch(setLoading(true));
      const updateAddresses = await getUserAddress();
      dispatch(setLoading(false));
      if ('success' in updateAddresses) {
        dispatch(setCartMyAddresses(updateAddresses.data));
        dispatch(setAddAddressView(false));
      }
      if ('error' in updateAddresses) {
        toast({ title: updateAddresses.error.message, variant: 'destructive' });
      }
    }
  };

  const handleEditAddress = async (address: IAddress) => {
    const payload: IAddress = {
      fullName: address.fullName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      country: 'India',
      postalCode: address.postalCode,
      phoneNumber: address.phoneNumber,
      additionalInstructions: address.additionalInstructions,
      email: address.email,
      type: address.type,
      isDefault: address.isDefault,
    };
    if (!validateAddressPayload(payload)) {
      toast({ title: 'All fields are mandatory', variant: 'destructive' });
      return;
    }
    dispatch(setLoading(true));
    const res = await updateAddress(address.id ?? -1, payload);
    dispatch(setLoading(false));
    if ('error' in res) {
      toast({ title: res.error.message, variant: 'destructive' });
    }
    if ('success' in res) {
      toast({ title: res.message });
      dispatch(setLoading(true));
      const updateAddresses = await getUserAddress();
      dispatch(setLoading(false));
      if ('success' in updateAddresses) {
        dispatch(setCartMyAddresses(updateAddresses.data));
        dispatch(setEditAddressView(false));
      }
      if ('error' in updateAddresses) {
        toast({ title: updateAddresses.error.message, variant: 'destructive' });
      }
    }
  };

  const handlePlaceOrder = async () => {
    const payload: IOrderRequestBody = {
      address: addressDetail,
      coupon: isCouponApplied ? coupon : '',
      items: cartItemsData.map((a) => {
        return {
          productId: a.id,
          quantity: a.quantity,
        };
      }),
      paymentMode: paymentMethod,
    };

    // validate data :
    if (!validateAddressPayload(payload.address)) {
      if (session?.user?.id) {
        toast({ title: 'Please Select Address', variant: 'destructive' });
      } else {
        toast({
          title: 'Please fill all the required fields',
          variant: 'destructive',
        });
      }
      return;
    }

    dispatch(setLoading(true));
    const res = await createOrder(payload);
    dispatch(setLoading(false));
    if ('success' in res) {
      // Check if user opted for online Payment :
      if (paymentMethod == OrderPaymentMode.ONLINE) {
        const paymentRequestPayload: IPaymentPayload = {
          name: payload.address.fullName,
          amount: 100,
          mobile: payload.address.phoneNumber,
          orderId: res.data.id,
        };
        dispatch(setLoading(true));
        const getPhonepePaymentURL: any = await handlePayment(
          paymentRequestPayload,
        );
        dispatch(setLoading(false));
        if ('success' in getPhonepePaymentURL) {
          router.push(getPhonepePaymentURL.data);
        } else {
          toast({ title: 'Failed to make Payment!', variant: 'destructive' });
        }
      } else {
        toast({ title: 'Order placed !' });
      }

      // if payment is successfull
      // if user is logged in
      // call clear cart api
      if (session?.user?.id) {
        dispatch(setLoading(true));
        const resDeleteCart = await deleteCart();
        if ('success' in resDeleteCart) {
          dispatch(clearCart());
        }
        dispatch(setLoading(false));
      } else {
        // call clear cart for redux
        dispatch(clearCart());
      }
      dispatch(setShowCartCheckoutModal(false));
      dispatch(setShowCartFeedbackModal(false));
      dispatch(setShowCartDrawer(false));
      dispatch(setShowPaymentView(false));
    } else {
      toast({ title: 'Failed to place order !', variant: 'destructive' });
    }
  };

  return (
    <div className="bg-white shadow-lg p-3">
      <Button
        onClick={async () => {
          if (session && session.user.id) {
            if (showPaymentView) {
              await handlePlaceOrder();
              // TO DO Payments
            } else if (showAddAddress || showEditAddress) {
              if (showEditAddress) {
                await handleEditAddress(addressDetail);
              }
              if (showAddAddress) {
                await handleAddAddress(addressDetail);
              }
            } else {
              dispatch(setShowPaymentView(true));
            }
          } else {
            if (showPaymentView) {
              // TO DO Payments
              await handlePlaceOrder();
            } else {
              if (!validateAddressPayload(addressDetail)) {
                toast({
                  title: 'Please fill all the required fields',
                  variant: 'destructive',
                });
                return;
              }
              dispatch(setShowPaymentView(true));
            }
          }
        }}
        className="text-2xl h-[56px] flex gap-3 bg-secondary-color hover:bg-primary-color text-white rounded-full font-heyComic w-full"
      >
        Continue
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

      <div className="text-[10px] mt-2 font-helvetica text-center text-gray-600">
        <p>By proceeding, I accept that I have read and</p>
        <p>understood Wollybee’s Privacy Policy and T&C.</p>
      </div>
    </div>
  );
}

export const CheckoutDetails = ({
  cartItemsData,
}: {
  cartItemsData: ICartItemClient[];
}) => {
  const [addressDetails, setAddressDetails] =
    useState<IAddress>(initialAddressState);

  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMode>(
    OrderPaymentMode.ONLINE,
  );

  return (
    <div className="bg-white rounded-lg shadow-lg w-full h-full flex flex-col">
      <Sandwich
        header={<UserDetailsHeader />}
        footer={
          <UserDetailFooter
            paymentMethod={paymentMethod}
            addressDetail={addressDetails}
            cartItemsData={cartItemsData}
          />
        }
        content={
          <UserDetailContent
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            addressDetail={addressDetails}
            onAddressChange={setAddressDetails}
            cartItemsData={cartItemsData}
          />
        }
      />
    </div>
  );
};
