'use client';

import { IProduct } from '@repo/ui/types';
import { Input } from '../../../../components/ui/input';
import { useEffect, useState } from 'react';
import CustomDialog from '../../components/common/CustomDialog';
import { Calendar } from '../../../../components/ui/calendar';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Button } from '../../../../components/ui/button';
import { IDealOfTheDayRequestBody } from '@repo/ui/types/dealOfTheDay';
import { toast } from 'sonner';
import { createDeal, updateDeal } from './deal.action';
import { useRouter } from 'next/navigation';
import { dashboardRoutes } from '@repo/ui/lib';
import Loader from '../../components/common/Loader';

interface IProductItemSelected extends IProduct {
  isSelected: boolean;
}

interface IDealsContainer {
  id?: number;
  products: IProductItemSelected[];
  type: string;
  date: string;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const DealsContainer = ({
  id = -1,
  products,
  date,
  type = 'READ',
}: IDealsContainer) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDate(new Date(date)),
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState(products);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setSelectedProducts(products);
  }, [products]);

  const handleSubmit = async () => {
    const payload: IDealOfTheDayRequestBody = {
      date: selectedDate,
      productIds: selectedProducts
        .filter((a) => {
          return a.isSelected;
        })
        .map((a) => {
          return a.id;
        }),
    };

    if (payload.productIds.length == 0) {
      toast('Please Select Products!!');
      return;
    }
    setLoading(true);
    let res = null;
    if (type == 'create') {
      res = await createDeal(payload);
    }

    if (type == 'edit') {
      res = await updateDeal(id, payload);
    }

    if (res && 'error' in res) {
      toast(res.error.message);
    }
    if (res && 'success' in res) {
      toast(res.message);
    }
    router.push(dashboardRoutes.dealOfTheDay);
    setLoading(false);
  };

  const handleClick = (id: number, value: boolean) => {
    const currentProducts = [...selectedProducts];
    const updatedProducts = currentProducts.map((a) => {
      if (a.id == id) {
        return {
          ...a,
          isSelected: value,
        };
      }
      return a;
    });
    setSelectedProducts(updatedProducts);
  };

  if (loading) {
    return <Loader text={type == 'create' ? 'Creating...' : 'Updating...'} />;
  }

  return (
    <div>
      <CustomDialog
        Component={
          <div className="w-full flex justify-center">
            <Calendar
              mode="single"
              selected={new Date(selectedDate)}
              onSelect={(date: Date | undefined) => {
                if (date) {
                  setSelectedDate(formatDate(new Date(date)));
                  setShowCalendar(false);
                }
              }}
              disabled={(date) => date < new Date() || type == 'READ'}
              initialFocus
            />
          </div>
        }
        open={showCalendar}
      />
      <div className="flex gap-2 my-2">
        <Input
          disabled={type == 'READ'}
          value={formatDate(new Date(selectedDate))}
          className="w-full"
          onClick={() => {
            setShowCalendar(true);
          }}
        />
        {type != 'READ' && (
          <Button onClick={handleSubmit}>{type?.toUpperCase()}</Button>
        )}
      </div>

      <div className="py-5 grid grid-cols-12">
        {selectedProducts.map((a) => (
          <div className="col-span-6 flex py-2 items-center gap-2" key={a.id}>
            <Checkbox
              disabled={type == 'READ'}
              className="w-5 h-5 rounded-none"
              checked={a.isSelected}
              onCheckedChange={(value) => {
                handleClick(a.id, value == true);
              }}
            />
            <p>{a.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsContainer;
