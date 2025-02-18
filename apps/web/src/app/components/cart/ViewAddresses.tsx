import React, { useEffect, useState } from 'react';
import { IAddress } from '@repo/ui/types/address';
import { Checkbox } from '../../../ui/components/ui/checkbox';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setAddAddressView,
  setCartMyAddresses,
  setEditAddressView,
  setLoading,
} from '@repo/ui/lib/features/cartSlice';
import EditAddressCheckout from '../../profile/address/EditAddressCheckout';
import AddNewAddressButtonCheckout from '../../profile/address/AddNewAddressCheckout';
import AddressContainer from '../../profile/address/AddressContainer';
import { AddressType } from '@repo/ui/enums/address';
import {
  addAddress,
  getUserAddress,
  updateAddress,
} from '../../profile/address/address.action';
import { toast } from '../../../ui/components/ui/use-toast';
import { initialAddressState } from './CartContainerWrapper';

interface IAddressClient extends IAddress {
  isSelected: boolean;
}

export const AddressCheckoutContainer = ({
  setAddressDetails,
}: {
  setAddressDetails: (address: IAddress) => void;
}) => {
  const dispatch = useAppDispatch();
  const { showAddAddress, showEditAddress, selectedAddress } = useAppSelector(
    (state) => state.cart,
  );

  if (showAddAddress) {
    return (
      <div className="h-[110px] py-2">
        <AddressContainer
          setAddress={setAddressDetails}
          onSubmit={() => {}}
          address={initialAddressState}
          isModal={false}
          onClose={() => {
            dispatch(setAddAddressView(false));
          }}
        />
      </div>
    );
  }

  if (showEditAddress) {
    return (
      <div className="h-[110px] my-2">
        <div>
          <AddressContainer
            setAddress={setAddressDetails}
            isModal={false}
            onClose={() => dispatch(setEditAddressView(false))}
            onSubmit={() => {}}
            address={selectedAddress}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[110px] py-4">
      <AddNewAddressButtonCheckout />
      <ViewAddresses setAddressDetails={setAddressDetails} />
    </div>
  );
};

const ViewAddresses = ({
  setAddressDetails,
}: {
  setAddressDetails: (address: IAddress) => void;
}) => {
  const { myAddresses: userAddresses } = useAppSelector((state) => state.cart);

  // Initialize addresses with isSelected set to false
  const [addresses, setAddresses] = useState<IAddressClient[]>(
    userAddresses.map((a, index) => ({
      ...a,
      isSelected: index == 0 ? true : false,
    })),
  );

  useEffect(() => {
    const selectedFilter = addresses.find((a) => a.isSelected == true);
    if (selectedFilter) {
      setAddressDetails(selectedFilter);
    } else {
      // no addresses are selected :
      setAddressDetails(initialAddressState);
    }
  }, [addresses]);
  return (
    <div className="flex flex-wrap gap-4 py-1 w-full px-10">
      {addresses.map((address) => (
        <div
          onClick={() => {
            setAddresses(
              addresses.map((a) => {
                return {
                  ...a,
                  isSelected: a.id === address.id ? !a.isSelected : false,
                };
              }),
            );
          }}
          key={address.id} // Use a unique key, ideally address.id
          className="bg-white-smoke border rounded-lg p-4 shadow-md w-full relative cursor-pointer"
        >
          {address.isDefault && (
            <p className="italic pb-2 text-primary-gray-light">
              DEFAULT ADDRESS
            </p>
          )}
          <h3 className="text-lg font-semibold">{address.fullName}</h3>
          <p className="text-gray-700">{address.addressLine1}</p>
          {address.addressLine2 && (
            <p className="text-gray-700">{address.addressLine2}</p>
          )}
          <p className="text-gray-700">
            {address.city}, {address.state}, {address.country} -{' '}
            {address.postalCode}
          </p>
          <p className="text-gray-700 mt-3">Phone: {address.phoneNumber}</p>

          <Checkbox
            checked={address.isSelected}
            className={`${address.isSelected ? 'bg-primary-color' : 'bg-white'} absolute -top-3 -right-3 rounded-full h-7 w-7 border-primary-color border-2 text-white font-bold`}
          />
          <div className="absolute bottom-2 right-2">
            <EditAddressCheckout address={address} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAddresses;
