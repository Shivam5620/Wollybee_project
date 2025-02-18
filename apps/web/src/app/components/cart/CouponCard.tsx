'use client';
import { useEffect, useState } from 'react';
import { Input } from '../../../ui/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '../../../ui/components/ui/select';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { ICouponResponse } from '@repo/ui/types/coupon';
import { Button } from '../../../ui/components/ui/button';
import { toast } from '../../../ui/components/ui/use-toast';
import { ICartItemClient } from '@repo/ui/types';
import { IValidateCoupon, validateCoupon } from '../../lib/action';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  applyCouponUpdateCart,
  setCouponsModalOpen,
  setLoading,
} from '@repo/ui/lib/features/cartSlice';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';

export const CouponItem = ({
  viewOnly = false,
  data,
  cartItemsData,
  setOpen,
}: {
  setOpen: (val: boolean) => void;
  viewOnly?: boolean;
  data: ICouponResponse;
  cartItemsData: ICartItemClient[];
}) => {
  const dispatch = useAppDispatch();

  const { isCouponApplied, coupon, loading } = useAppSelector(
    (state) => state.cart,
  );

  if (isCouponApplied && coupon === data.code) {
    return null;
  }

  const handleCouponApplyClick = async () => {
    const payload: IValidateCoupon = {
      items: cartItemsData.map((a) => {
        return { productId: a.id, quantity: a.quantity };
      }),
      coupon: data.code,
    };
    dispatch(setLoading(true));
    const res = await validateCoupon(payload);
    dispatch(setLoading(false));
    if (res.success) {
      dispatch(applyCouponUpdateCart(res.data));
      toast({ title: `${data.code} Applied` });
      setOpen(false);
      dispatch(setCouponsModalOpen(false));
    }

    if (res.error) {
      const errorObj = JSON.parse(res.error.message);
      toast({ title: errorObj.message, variant: 'destructive' });
    }
  };
  return (
    <div className="p-2 mt-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <span className="rounded-full bg-gray-200 w-6 h-6"></span>
          <p className="rounded-full border-2 border-dashed border-gray-200 px-2 text-primary-black font-bold text-[12px]">
            {data.code}
          </p>
        </div>
        {!viewOnly && (
          <Button
            disabled={(isCouponApplied && coupon === data.code) || loading}
            onClick={handleCouponApplyClick}
            className="bg-white hover:bg-white hover:text-primary-black text-secondary-color font-helveticaRoundedBold text-base pl-3"
          >
            {isCouponApplied && coupon === data.code ? 'APPLIED' : 'APPLY'}
          </Button>
        )}
      </div>
      <p className="font-helveticaRoundedBold text-tertiary-green text-[15px] mt-2 flex flex-wrap max-w-60">
        {data.description}
      </p>
    </div>
  );
};

export const TryCoupon = ({
  couponCode,
  cartItemsData,
  setOpen,
}: {
  couponCode: string;
  setOpen: (val: boolean) => void;
  cartItemsData: ICartItemClient[];
}) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.cart);

  const handleCouponApplyClick = async () => {
    const payload: IValidateCoupon = {
      items: cartItemsData.map((a) => {
        return { productId: a.id, quantity: a.quantity };
      }),
      coupon: couponCode,
    };
    dispatch(setLoading(true));
    const res = await validateCoupon(payload);
    dispatch(setLoading(false));
    if (res.success) {
      dispatch(applyCouponUpdateCart(res.data));
      toast({ title: `${couponCode} Applied` });
      setOpen(false);
      dispatch(setCouponsModalOpen(false));
    }

    if (res.error) {
      const errorObj = JSON.parse(res.error.message);
      toast({ title: errorObj.message, variant: 'destructive' });
    }
  };
  return (
    <div className="p-2 mt-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <span className="rounded-full bg-gray-200 w-6 h-6"></span>
          <p className="rounded-full border-2 border-dashed border-gray-200 px-2 text-primary-black font-bold text-[12px]">
            {couponCode}
          </p>
        </div>

        <Button
          disabled={loading}
          onClick={handleCouponApplyClick}
          className="bg-white hover:bg-white hover:text-primary-black text-secondary-color font-helveticaRoundedBold text-base pl-3 "
        >
          APPLY
        </Button>
      </div>
      <p className="font-helveticaRoundedBold text-tertiary-green text-[15px] mt-2 flex flex-wrap max-w-60"></p>
    </div>
  );
};

export const CouponsCard = ({
  viewOnly = false,
  filterId = -1,
  cartItemsData,
  label,
  className,
  title,
  disabled = false,
}: {
  title?: string;
  filterId?: number;
  viewOnly?: boolean;
  label: string;
  cartItemsData: ICartItemClient[];
  className?: ClassNameValue;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { coupons } = useAppSelector((state) => state.configuration);
  const [open, setOpen] = useState<boolean>(false);

  let filteredCoupons = coupons.filter((a) => {
    if (filterId && filterId > 0) {
      const isCouponAvailableForProduct = a.products.find(
        (b) => b.id === filterId,
      );

      if (isCouponAvailableForProduct) {
        return true;
      }
    }
    return false;
  });

  const [options, setOptions] = useState<ICouponResponse[]>(
    filterId > 0 ? filteredCoupons : coupons,
  );
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!viewOnly) {
      const timeout = setTimeout(() => {
        if (searchText) {
          setOptions(
            coupons.filter((a) => {
              return a.code.toLowerCase().includes(searchText.toLowerCase());
            }),
          );
        } else {
          setOptions(coupons);
        }
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [searchText, viewOnly]);

  useEffect(() => {
    if (viewOnly && filterId > 0) {
      let filteredCoupons = coupons.filter((a) => {
        if (filterId && filterId > 0) {
          const isCouponAvailableForProduct = a.products.find(
            (b) => b.id === filterId,
          );

          if (isCouponAvailableForProduct) {
            return true;
          }
        }
        return false;
      });
      setOptions(filteredCoupons);
    }
  }, [viewOnly, filterId]);

  return (
    <div className="relative w-full">
      <Select
        disabled={disabled}
        open={open}
        onOpenChange={(val: boolean) => {
          setOpen(val);
          dispatch(setCouponsModalOpen(val));
        }}
      >
        <SelectTrigger
          className={twMerge(
            'border-[2px] border-dashed my-2 md:h-12 h-12 mx-auto border-primary-gray-light text-secondary-color rounded-full px-10',
            className,
          )}
        >
          <p
            className="font-heyComic text-xl justify-center"
            onClick={() => {
              setOpen(!open);
              dispatch(setCouponsModalOpen(!open));
            }}
          >
            {label}
          </p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <div className="px-4">
              <div className="flex gap-2">
                {!viewOnly && (
                  <Input
                    className="rounded-full w-full my-2 mx-auto border-secondary-color text-lg"
                    placeholder="Enter Coupon code"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                )}

                <Image
                  alt="close"
                  onClick={() => {
                    setOpen(false);
                    setSearchText('');
                    dispatch(setCouponsModalOpen(false));
                  }}
                  height={50}
                  className={`${viewOnly && 'absolute top-1 right-0 float-right'} cursor-pointer`}
                  src={ICONS.closeIconModal}
                  width={50}
                />
              </div>

              {title && (
                <p className="font-heyComic p-2 text-lg text-primary-color mt-1">
                  {title}
                </p>
              )}
              {options.map((a) => (
                <CouponItem
                  setOpen={setOpen}
                  viewOnly={viewOnly}
                  key={a.code}
                  cartItemsData={cartItemsData}
                  data={a}
                />
              ))}
              {options.length == 0 && (
                <TryCoupon
                  couponCode={searchText}
                  cartItemsData={cartItemsData}
                  setOpen={setOpen}
                />
              )}
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
