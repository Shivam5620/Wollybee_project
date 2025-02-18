import { ICONS } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../../../ui/components/ui/button';
import { Input } from '../../../ui/components/ui/input';

type IUser = {
  name: string;
  mobile: string;
  email: string;
};

const ComingSoonModal = ({
  product,
  onClose,
}: {
  product: IProduct;
  onClose: () => void;
}) => {
  const [userData, setUserData] = useState<any>({
    name: '',
    mobile: '',
    email: '',
  });

  const handleNotifyMe = () => {
    // TODO: validate the payload
    // CALL API
    // if Success the show toast and close
    onClose();
  };

  return (
    <div>
      {/* {loading && <LoadingBar />} */}
      <div className="w-full flex justify-between my-2 px-2 items-center">
        <p></p>
        <h1 className="text-xl text-primary-black font-heyComic">
          {product.name}
        </h1>
        <Image
          alt="closeIcon"
          className="cursor-pointer"
          src={ICONS.closeIconModal}
          width={40}
          height={40}
          onClick={() => onClose()}
        />
      </div>

      <div className="flex flex-col justify-center text-center items-center px-3">
        <Input
          className="rounded-full my-1 w-full sm:w-full"
          type="text"
          required
          name="name"
          value={userData.name}
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
          }}
          placeholder="Enter Name"
        />

        <Input
          className="rounded-full my-1 w-full sm:w-full"
          type="text"
          required
          name="email"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
          placeholder="Enter email"
        />

        <Input
          className="rounded-full my-1 w-full sm:w-full"
          type="number"
          required
          name="mobile"
          value={userData.mobile}
          onChange={(e) => {
            setUserData({ ...userData, mobile: e.target.value });
          }}
          placeholder="Enter mobile"
        />

        <div className="px-3 w-full py-5">
          <Button
            size="sm"
            onClick={() => {
              handleNotifyMe();
            }}
            className="rounded-full font-heyComic sm:h-10 lg:h-12 md:text-base xs:text-xs text-[0.85rem] w-full border-2 border-tertiary-green text-tertiary-green bg-white hover:bg-tertiary-green hover:text-white"
          >
            Notify me !
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
