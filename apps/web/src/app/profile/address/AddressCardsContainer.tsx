'use client';
import { IAddress } from '@repo/ui/types/address';
import React, { useEffect, useState } from 'react';
import EditAddressModal from './EditAddressModal';
import SetAddressAsDefaultButton from './SetAddressAsDefaultButton';
import RemoveAddressButton from './RemoveAddressButton';
import { Search } from 'lucide-react';
import { Input } from '../../../ui/components/ui/input';
import AddAddressModal from './AddAddressModal';

const MyAddressCard = ({ address }: { address: IAddress }) => {
  return (
    <div
      key={address.id}
      className="mb-4 bg-white shadow-[0px_2px_15px_0px_#00000018] flex flex-col justify-between rounded-3xl px-4 md:px-10 md:py-6 py-4 w-full sm:w-[320px] relative my-3"
    >
      <div>
        {address.isDefault && (
          <p className="italic pb-2 text-primary-gray-light">DEFAULT ADDRESS</p>
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
      </div>

      <div className="md:flex justify-between md:gap-10 my-2">
        <div className="absolute  right-4 top-5">
          <EditAddressModal address={address} />
        </div>
        <div className="items-center flex justify-between w-full gap-4">
          <SetAddressAsDefaultButton address={address} />
          <RemoveAddressButton address={address} />
        </div>
      </div>
    </div>
  );
};

const AddressCardsContainer = ({ addresses }: { addresses: IAddress[] }) => {
  const [filteredAddresses, setFilteredAddresses] =
    useState<IAddress[]>(addresses);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setFilteredAddresses(addresses);
  }, [addresses]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        setFilteredAddresses(
          addresses.filter((a) =>
            JSON.stringify(a).toLowerCase().includes(search.toLowerCase()),
          ),
        );
      } else {
        setFilteredAddresses(addresses);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <>
      <div className="flex gap-2 items-center w-full relative">
        <AddAddressModal />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="pr-11 w-[100%] mx-auto md:w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full border-[1px] border-primary-gray-light text-md text-primary-gray md:text-sm my-1"
          placeholder="Search Address"
        />
        <Search className="absolute top-1/2 -translate-y-1/2 right-4 bg-white stroke-primary-gray-light  " />
      </div>
      <div className="flex gap-1 sm:gap-4 flex-wrap py-2 justify-center">
        {filteredAddresses.map((a) => (
          <MyAddressCard key={a.id} address={a} />
        ))}
      </div>
    </>
  );
};

export default AddressCardsContainer;
