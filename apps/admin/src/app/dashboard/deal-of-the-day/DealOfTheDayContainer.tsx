'use client';

import { IProduct } from '@repo/ui/types';
import React, { useState } from 'react';
import { Calendar } from '../../../../components/ui/calendar';
import { Button } from '../../../../components/ui/button';
import CustomDialog from '../../components/common/CustomDialog';
import ListProductSelector from '../../components/common/ListProductSelector';

const DealOfTheDayContainer = ({ products }: { products: IProduct[] }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [showSelectProduct, setShowSelectProducts] = useState<boolean>(false);
  const [showSelectDate, setShowSelectDate] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  return (
    <div>
      <CustomDialog
        className="max-w-[95vh] max-h-[95vh] overflow-scroll"
        open={showSelectProduct}
        Component={
          <ListProductSelector
            onCancelClick={() => {
              setShowSelectProducts(false);
            }}
            onSelectClick={(selectedProducts) => {
              setSelectedProducts(selectedProducts);
              setShowSelectProducts(false);
            }}
            products={products}
          />
        }
      />

      <CustomDialog
        className=""
        open={showSelectDate}
        Component={
          <div className="flex justify-center w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(val) => {
                setDate(val);
                setShowSelectDate(false);
              }}
              className=""
            />
          </div>
        }
      />

      <div className="py-2 flex flex-col gap-4 max-w-96 justify-between">
        <Button
          className={date != undefined ? 'bg-primary-color' : ''}
          onClick={() => {
            setShowSelectDate(true);
          }}
        >
          {date != undefined ? 'Date Selected' : 'Select Date'}
        </Button>

        <Button
          className={selectedProducts.length > 0 ? 'bg-primary-color' : ''}
          onClick={() => {
            setShowSelectProducts(true);
          }}
        >
          {selectedProducts.length > 0
            ? 'Products Selected'
            : 'Select Products'}
        </Button>
      </div>

      <div>
        <Button
          className="w-full max-w-96 my-2"
          disabled={!(selectedProducts.length > 0 && date != undefined)}
          onClick={() => {}}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DealOfTheDayContainer;
