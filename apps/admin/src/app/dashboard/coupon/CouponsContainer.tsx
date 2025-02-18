import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { createCoupon, editCoupon } from './coupon.action';
import { formatDate } from '../deal-of-the-day/DealsContainer';
import { ICouponResponse } from '@repo/ui/types/coupon';
import { IProduct } from '@repo/ui/types';
import CustomDialog from '../../components/common/CustomDialog';
import ListProductSelector from '../../components/common/ListProductSelector';
import { Calendar } from '../../../../components/ui/calendar';

export interface ICouponContainerProps {
  onClose: () => void;
  initialValues?: ICouponResponse;
  type?: 'edit' | 'create';
  products: IProduct[];
}

export default function CouponsContainer({
  products = [],
  onClose,
  initialValues,
  type = 'create',
}: ICouponContainerProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showSelectProduct, setShowSelectProducts] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [code, setCode] = useState<string>(initialValues?.code ?? '');
  const [description, setDescription] = useState<string>(
    initialValues?.description ?? '',
  );
  const [discountPercentage, setDiscoutPercentage] = useState<number>(
    initialValues?.discountPercentage ?? 0,
  );
  const [productIds, setProductIds] = useState<number[]>(
    initialValues?.products?.map((a) => a.id) ?? [],
  );
  const [redeemBefore, setRedeemBefore] = useState<any>(
    initialValues?.redeemBefore
      ? formatDate(new Date(initialValues?.redeemBefore))
      : formatDate(new Date()),
  );
  const [maxDiscount, setMaxDiscount] = useState<number>(
    initialValues?.maxDiscount ?? 0,
  );
  const [minCartValue, setMinCartValue] = useState<number>(
    initialValues?.minCartValue ?? 0,
  );

  const reset = () => {
    setCode('');
    setDescription('');
    setProductIds([]);
    setDiscoutPercentage(0);
    setRedeemBefore(formatDate(new Date()));
    setMaxDiscount(0);
    setMinCartValue(0);
  };

  const isValid = () => {
    return !(
      code !== '' &&
      description !== '' &&
      discountPercentage >= 0 &&
      maxDiscount >= 0 &&
      minCartValue > 0 
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    let data = null;
    const payload = {
      code,
      description,
      discountPercentage,
      maxDiscount,
      minCartValue,
      productIds,
      redeemBefore,
    };
    if (type === 'create') {
      data = await createCoupon(payload);
    }
    if (type === 'edit') {
      data = await editCoupon({ id: initialValues?.id ?? -1, payload });
    }

    if (data && 'error' in data) {
      toast(data.error.message);
    }
    if (data && 'success' in data) {
      toast(data.message);
      reset();
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="py-2 font-bold">{type.toLocaleUpperCase()} Coupon</h1>

      <CustomDialog
        className="max-w-[95vh] max-h-[95vh] overflow-scroll"
        open={showSelectProduct}
        Component={
          <ListProductSelector
            onCancelClick={() => {
              setShowSelectProducts(false);
            }}
            onSelectClick={(selectedProducts) => {
              setProductIds(selectedProducts);
              setShowSelectProducts(false);
            }}
            products={products}
          />
        }
      />

      <CustomDialog
        Component={
          <div className="w-full flex justify-center">
            <Calendar
              mode="single"
              selected={redeemBefore}
              onSelect={(date) => {
                if (date) {
                  setRedeemBefore(formatDate(new Date(date)));
                  setShowCalendar(false);
                }
              }}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </div>
        }
        open={showCalendar}
      />

      <Input
        label="Enter Code"
        value={code}
        className="my-2"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        placeholder="Enter Code"
      />

      <Input
        label="Enter Description"
        value={description}
        className="my-2"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Enter Description"
      />

      <Button
        className={`my-2 ${productIds.length > 0 && 'bg-primary-color text-black'}`}
        onClick={() => {
          setShowSelectProducts(true);
        }}
      >
        {productIds.length > 0 ? 'Products Selected' : 'Select Products'}
      </Button>

      <Input
        label="Select Redeem Before Date"
        value={formatDate(new Date(redeemBefore))}
        className="w-full my-2"
        onClick={() => {
          setShowCalendar(true);
        }}
      />

      <Input
        label="Enter Discount %"
        type="number"
        value={discountPercentage}
        className="my-2"
        onChange={(e) => {
          setDiscoutPercentage(Math.floor(Number(e.target.value)));
        }}
        placeholder="Enter Description"
      />

      <Input
        label="Enter Minimum Cart Value"
        value={minCartValue}
        className="my-2"
        type="number"
        onChange={(e) => {
          setMinCartValue(Math.floor(Number(e.target.value)));
        }}
        placeholder="Enter Minimum Cart Value"
      />

      <Input
        label="Enter Maximum Discount"
        value={maxDiscount}
        className="my-2"
        type="number"
        onChange={(e) => {
          setMaxDiscount(Math.floor(Number(e.target.value)));
        }}
        placeholder="Enter Maximum Discount"
      />

      <div className="flex gap-3 px-3 mt-5 justify-end">
        <Button
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={loading || isValid()}
          className="bg-secondary-color"
          onClick={handleSubmit}
        >
          {type.toLocaleUpperCase()}
        </Button>
      </div>
    </div>
  );
}
