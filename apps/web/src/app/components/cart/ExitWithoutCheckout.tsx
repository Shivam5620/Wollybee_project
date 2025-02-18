'use client'

import { Checkbox } from '../../../ui/components/ui/checkbox';
import { Button } from '../../../ui/components/ui/button';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { createFeedback } from './cart.action';
import {
  IFeedbackRequestBody,
} from '@repo/ui/types/feedback';
import { FeedbackType } from '@repo/ui/enums/feedback';
import { useEffect, useState } from 'react';
import { ICartItemClient } from '@repo/ui/types';
import { toast } from '../../../ui/components/ui/use-toast';
import { CheckedState } from '@radix-ui/react-checkbox';
import {
  setShowCartCheckoutModal,
  setShowCartFeedbackModal,
} from '@repo/ui/lib/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

interface ISelectedItem {
  name: string;
  value: string;
  isSelected: boolean | CheckedState;
}

const ExitWithoutCheckout = ({
  cartItemsData,
}: {
  cartItemsData: ICartItemClient[];
}) => {
  const dispatch = useAppDispatch();
  const { feedbackOptions } = useAppSelector((state) => state.configuration);

  const [selectedOptions, setSelectedOptions] = useState<ISelectedItem[]>([]);

  useEffect(() => {
    setSelectedOptions(
      feedbackOptions?.map((a) => {
        return {
          name: a,
          value: a,
          isSelected: false,
        };
      }),
    );
  }, [feedbackOptions]);

  const handleExit = async () => {
    const selectedReason = selectedOptions?.find((a) => a.isSelected);
    if (selectedReason) {
      const payload: IFeedbackRequestBody = {
        productIds: cartItemsData ? cartItemsData.map((a) => a.id) : [],
        reason: selectedReason.value,
        type: FeedbackType.ABANDONED_CART,
      };
      const res = await createFeedback(payload);
      if ('error' in res) {
        toast({ title: res.error.message });
      }
    }

    dispatch(setShowCartCheckoutModal(false));
    dispatch(setShowCartFeedbackModal(false));
  };

  return (
    <div className="md:px-10 px-4 text-left text-primary-black ">
      <p className="text-lg md:text-xl font-heyComic mt-4">
        Wait, are you sure ?
      </p>
      <p className="text-[11px] sm:text-sm">
        {'Can you let us know the reason(s) ?'}
      </p>

      <div className="pt-2 pb-2 justify-center">
        {selectedOptions?.map((a, index) => (
          <div
            key={index}
            className="gap-3 font-heyComic flex items-center md:py-2 py-1"
          >
            <Checkbox
              checked={a.isSelected}
              onCheckedChange={(value) => {
                setSelectedOptions(
                  selectedOptions.map((b) => {
                    return {
                      ...b,
                      isSelected: b.name === a.name ? value : false,
                    };
                  }),
                );
              }}
              className="w-5 h-5 rounded-full border border-primary-color data-[state=checked]:bg-primary-color text-white"
            />
            <span
        onClick={() => {
          const newValue = !a.isSelected;
          setSelectedOptions(
            selectedOptions.map((b) => ({
              ...b,
              isSelected: b.name === a.name ? newValue : false,
            }))
          );
        }}
        className="text-md sm:text-lg md:text-md cursor-pointer text-wrap max-w-[300px] sm:max-w-[700px] break-words"
      >
        {a.name}
      </span>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end gap-3 py-2 md:pb-0 mt-10 sm:mt-0 md:pt-6">
        <Button
          onClick={handleExit}
          className=" border-secondary-color w-32 sm:w-44 hover:bg-primary-color hover:text-white hover:border-primary-color border-[2px] text-secondary-color rounded-full bg-white font-heyComic h-10 "
        >
          Exit
        </Button>

        <Button
          onClick={() => {
            dispatch(setShowCartFeedbackModal(false));
            dispatch(setShowCartCheckoutModal(true));
          }}
          className="w-44 text-center sm:w-56 bg-secondary-color flex gap-2 text-white hover:bg-primary-color rounded-full font-heyComic "
        >
          Continue Checkout
          <svg
            width="30"
            height="25"
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

export default ExitWithoutCheckout;