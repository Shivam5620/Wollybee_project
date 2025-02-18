import { ICONS } from '@repo/ui/lib';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '../../../ui/components/ui/select';
import { ICartItemClient } from '@repo/ui/types';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../lib/hooks';
import CouponApplied from './CouponApplied';
import Sandwich from '../common/Sandwich';
import { OrderPaymentMode } from '@repo/ui/enums/order';

function OrderSummaryItem({ item }: { item: ICartItemClient }) {
  return (
    <div className="items-center py-2 px-1 flex">
      <Image
        src={item.images.length > 0 ? item.images[0].url : ''}
        alt="image"
        width={100}
        height={100}
      />

      <section className="font-heyComic text-[11px] text-primary-black pl-4">
        <p className="truncate">{item.name}</p>
        <p>Rs. {item.discountedPrice}</p>
        <p>Quantity : {item.quantity}</p>
      </section>
    </div>
  );
}

export const OrdersSummaryCard = ({
  label,
  cartItemsData = [],
}: {
  label: string;
  cartItemsData: ICartItemClient[];
}) => {
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const { discountedAmount, isCouponApplied, paymentMode } = useAppSelector(
    (state) => state.cart,
  );

  const { freeShippingCartValue, shippingCharges, codCharges } = useAppSelector(
    (state) => state.configuration,
  );

  useEffect(() => {
    let total: number = 0;
    cartItemsData.forEach((a) => {
      total += a.discountedPrice * a.quantity;
    });
    setCurrentTotal(total);
  }, [cartItemsData]);

  const calculatedFinalPrice: number = isCouponApplied
    ? discountedAmount
    : currentTotal +
      (currentTotal > freeShippingCartValue ? 0 : shippingCharges);

  return (
    <div className="h-[3/4]">
      <Sandwich
        header={
          <div className="flex gap-2 items-center">
            <Image src={ICONS.fillCartIcon} alt="cart" width={50} height={50} />

            <p className="font-helveticaRoundedBold text-primary-black text-lg">
              {label}
            </p>
          </div>
        }
        content={
          <div className="h-[100px] sm:h-[200px] overflow-y-scroll">
            {cartItemsData.map((a) => (
              <OrderSummaryItem key={a.id} item={a} />
            ))}
          </div>
        }
        footer={
          <>
            <div className=" [box-shadow:0_0_15px_rgba(0,0,0,0.18)] bg-white rounded-lg px-2">
              <div className=" font-heyComic text-primary-black border-b-primary-black border-b-2 py-3 px-3">
                <CouponApplied />
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  {isCouponApplied && <p>Rs.{discountedAmount}.00</p>}
                  <p className={isCouponApplied ? 'line-through' : ''}>
                    Rs.{currentTotal}.00
                  </p>
                </div>

                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>
                    Rs.
                    {currentTotal > freeShippingCartValue ? 0 : shippingCharges}
                  </p>
                </div>

                {paymentMode === OrderPaymentMode.CASH_ON_DELIVERY && (
                  <div className="flex justify-between">
                    <p>COD Charges</p>
                    <p>
                      Rs.
                      {codCharges}
                    </p>
                  </div>
                )}
              </div>
              <div className="py-2 flex font-heyComic justify-between text-lg text-primary-black px-3">
                <p>To Pay</p>
                <p>
                  Rs.
                  {paymentMode === OrderPaymentMode.CASH_ON_DELIVERY
                    ? calculatedFinalPrice + codCharges
                    : calculatedFinalPrice}
                  .00
                </p>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};
