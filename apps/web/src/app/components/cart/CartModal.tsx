'use client';
import { CouponsCard } from './CouponCard';
import { CheckoutDetails } from './UserInfoForm';
import { OrdersSummaryCard } from './OrderSummary';
import { ICartItemClient } from '@repo/ui/types';

export const OrderSummaryDetailsAndCouponContainer = ({
  cartItemsData,
}: {
  cartItemsData: ICartItemClient[];
}) => {
  return (
    <div className=" rounded-lg  w-full h-full flex flex-col">
      {/* Content */}
      <div className="flex-grow relative overflow-y-auto">
        <div className="absolute inset-0">
          <OrdersSummaryCard
            cartItemsData={cartItemsData}
            label="Order Summary"
          />
          <CouponsCard
            cartItemsData={cartItemsData}
            label="Click here to view coupons"
          />
        </div>
      </div>
    </div>
  );
};

const CartModal = ({ cartItemsData }: { cartItemsData: ICartItemClient[] }) => {
  return (
    <>
      <div className="h-full flex">
        <div className="h-full w-full md:w-[60%]">
          <CheckoutDetails cartItemsData={cartItemsData} />
        </div>
        <div className="hidden md:block h-full w-[40%] bg-gray-100 p-3 rounded-md">
          <OrderSummaryDetailsAndCouponContainer
            cartItemsData={cartItemsData}
          />
        </div>
      </div>
    </>
  );
};

export default CartModal;
