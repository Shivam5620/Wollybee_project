'use client';
import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { IAddress } from '@repo/ui/types/address';
import CustomDialog from '../../components/common/CustomDialog';
import AddressContainer from './AddressContainer';
import { updateAddress } from './address.action';
import { toast } from '../../../ui/components/ui/use-toast';
import { validateAddressPayload } from './address.utils';

const EditAddressModal = ({ address }: { address: IAddress }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

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
    }
  };

  const handleEdit = async () => {
    setShowModal(true);
  };

  return (
    <>
      <CustomDialog
        className="max-w-[95vh] max-h-[95vh] overflow-scroll"
        open={showModal}
        Component={
          <AddressContainer
            onSubmit={handleSaveAddress}
            isModal={true}
            address={address}
            onClose={() => {
              setShowModal(false);
            }}
          />
        }
      />

      <Pencil
        onClick={handleEdit}
        size={24}
        className="my-2 text-secondary-color cursor-pointer"
      />
    </>
  );
};

export default EditAddressModal;
