'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setAddAddressView,
  setCartMyAddresses,
} from '@repo/ui/lib/features/cartSlice';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { addAddress, getUserAddress } from './address.action';
import { toast } from '../../../ui/components/ui/use-toast';
import { IAddress } from '@repo/ui/types/address';
import AddressContainer from './AddressContainer';
import { initialAddressState } from '../../components/cart/CartContainerWrapper';
import { validateAddressPayload } from './address.utils';

const AddNewAddressButtonCheckout = () => {
  const dispatch = useAppDispatch();

  const { showAddAddress } = useAppSelector((state) => state.cart);

  const handleAddNewAddress = async () => {
    dispatch(setAddAddressView(true));
  };

  const handleSaveAddress = async (address: IAddress) => {
    if (!validateAddressPayload(address)) {
      toast({
        title: 'Please fill all details correctly!',
        variant: 'destructive',
      });
      return;
    }
    const res = await addAddress(address);
    if ('error' in res) {
      toast({ title: res.error.message, variant: 'destructive' });
    }
    if ('success' in res) {
      toast({ title: res.message });
      const updateAddresses = await getUserAddress();
      if ('success' in updateAddresses) {
        dispatch(setCartMyAddresses(updateAddresses.data));
      }
      if ('error' in updateAddresses) {
        toast({ title: updateAddresses.error.message, variant: 'destructive' });
      }
    }
  };

  return (
    <>
      {showAddAddress ? (
        <AddressContainer
          onSubmit={handleSaveAddress}
          isModal={false}
          address={initialAddressState}
          onClose={() => {
            dispatch(setAddAddressView(false));
          }}
        />
      ) : (
        <div className="flex gap-3 pl-5 text-primary-gray text-md py-3 items-center">
          <Image
            width={24}
            className="cursor-pointer"
            height={24}
            onClick={handleAddNewAddress}
            alt="Edit address"
            src={ICONS.addAddressIcon}
          />
          <p
            onClick={handleAddNewAddress}
            className="text-secondary-color cursor-pointer"
          >
            ADD NEW ADDRESS
          </p>
        </div>
      )}
    </>
  );
};

export default AddNewAddressButtonCheckout;
