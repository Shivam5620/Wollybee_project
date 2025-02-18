'use client';
import React from 'react';
import { IAddress } from '@repo/ui/types/address';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setEditAddressView,
  setSelectedAddress,
} from '@repo/ui/lib/features/cartSlice';
import { Pencil } from 'lucide-react';
import AddressContainer from './AddressContainer';
import { updateAddress } from './address.action';
import { toast } from '../../../ui/components/ui/use-toast';
import { validateAddressPayload } from './address.utils';

const EditAddressCheckout = ({ address }: { address: IAddress }) => {
  const dispatch = useAppDispatch();

  const { showEditAddress } = useAppSelector((state) => state.cart);

  const handleEditAddress = async (e: any) => {
    e.preventDefault();
    dispatch(setSelectedAddress(address));
    dispatch(setEditAddressView(true));
  };

  const handleSaveAddress = async (address: IAddress) => {
    if (!validateAddressPayload(address)) {
      toast({
        title: 'Please fill all details correctly!',
        variant: 'destructive',
      });
      return;
    }
    const res = await updateAddress(address.id ?? -1, {
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
    });

    if ('error' in res) {
      toast({ title: res.error.message, variant: 'destructive' });
    }
    if ('success' in res) {
      toast({ title: res.message });
      dispatch(setEditAddressView(false));
    }
  };

  return (
    <>
      {showEditAddress ? (
        <AddressContainer
          onSubmit={handleSaveAddress}
          isModal={false}
          address={address}
          onClose={() => {
            dispatch(setEditAddressView(false));
          }}
        />
      ) : (
        <Pencil
          onClick={handleEditAddress}
          size={24}
          className="text-secondary-color cursor-pointer"
        />
      )}
    </>
  );
};

export default EditAddressCheckout;
