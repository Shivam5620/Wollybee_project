'use client';
import React, { useState } from 'react';
import CustomDialog from '../../components/common/CustomDialog';
import { Plus } from 'lucide-react';
import { Button } from '../../../ui/components/ui/button';
import { IAddress } from '@repo/ui/types/address';
import { addAddress, getUserAddress } from './address.action';
import { toast } from '../../../ui/components/ui/use-toast';
import AddressContainer from './AddressContainer';
import { initialAddressState } from '../../components/cart/CartContainerWrapper';
import { validateAddressPayload } from './address.utils';

const AddAddressModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    setShowModal(true);
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
      setShowModal(false);
      toast({ title: res.message });
      const updateAddresses = await getUserAddress();
      if ('error' in updateAddresses) {
        toast({ title: updateAddresses.error.message, variant: 'destructive' });
      }
    }
  };

  return (
    <>
      <CustomDialog
        className="max-h-[95vh] w-[90%] md:max-w-[95vh] overflow-scroll rounded-3xl sm:rounded-3xl"
        open={showModal}
        Component={
          <AddressContainer
            type="Add"
            onSubmit={handleSaveAddress}
            address={initialAddressState}
            isModal={true}
            onClose={() => {
              setShowModal(false);
            }}
          />
        }
      />

      <>
        <Button
          className="rounded-full hover:bg-secondary-color bg-primary-color px-4  py-2 text-white font-heyComic text-base md:text-xl flex gap-1 items-center"
          onClick={handleClick}
        >
          <Plus className="inline-block stroke-[3px]" />
          ADD
          <p className="md:inline-block hidden"> NEW ADDRESS</p>
        </Button>
      </>
    </>
  );
};

export default AddAddressModal;
