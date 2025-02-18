import { ICONS } from '@repo/ui/lib';
import { IAddress } from '@repo/ui/types/address';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../ui/components/ui/button';
import { Input } from '../../../ui/components/ui/input';
import Image from 'next/image';
import { AddressType } from '@repo/ui/enums/address';
import { Checkbox } from '../../../ui/components/ui/checkbox';

const AddressContainer = ({
  type = 'Edit',
  isModal,
  onSubmit,
  onClose,
  address: initialValues,
  setAddress,
}: {
  type?: string;
  isModal: boolean;
  onSubmit: (address: IAddress) => void;
  onClose: () => void;
  address: IAddress;
  setAddress?: (address: IAddress) => void;
}) => {
  const [addressDetail, setAddressDetail] = useState<IAddress>(initialValues);

  useEffect(() => {
    if (setAddress) {
      setAddress(addressDetail);
    }
  }, [addressDetail]);

  return (
    <div>
      {isModal && (
        <section className="justify-center items-center flex py-1">
          <p className="text-xl text-primary-color font-cheri">
            {type} Address
          </p>
        </section>
      )}

      {isModal && (
        <Image
          className="absolute top-1 right-3 cursor-pointer"
          src={ICONS.closeIconModal}
          onClick={() => {
            onClose();
          }}
          alt="closeIcon"
          width={40}
          height={40}
        />
      )}

      <div>
        <div className="px-5 sm:px-5">
          <p className="text-md md:text-lg font-heyComic text-primary-black">
            Contact Information
          </p>
          <Input
            value={addressDetail.fullName}
            onChange={(e) =>
              setAddressDetail({ ...addressDetail, fullName: e.target.value })
            }
            type="text"
            className="border-[#CCCCCC] text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
            placeholder="Name"
          />
          <Input
            value={addressDetail.email}
            onChange={(e) =>
              setAddressDetail({ ...addressDetail, email: e.target.value })
            }
            type="text"
            className="border-[#CCCCCC] text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
            placeholder="Email Address"
          />

          <Input
            value={addressDetail.phoneNumber}
            onChange={(e) =>
              setAddressDetail({
                ...addressDetail,
                phoneNumber: e.target.value,
              })
            }
            type="number"
            className="border-[#CCCCCC] col-span-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
            placeholder="Mobile Number"
          />

          <div>
            <p className="text-md md:text-lg font-heyComic mt-2 text-primary-black">
              Delivery Address
            </p>
            <Input
              value={addressDetail.addressLine1}
              onChange={(e) =>
                setAddressDetail({
                  ...addressDetail,
                  addressLine1: e.target.value,
                })
              }
              type="text"
              className="border-[#CCCCCC] col-span-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
              placeholder="Street Address"
            />
            <Input
              value={addressDetail.addressLine2}
              onChange={(e) =>
                setAddressDetail({
                  ...addressDetail,
                  addressLine2: e.target.value,
                })
              }
              type="text"
              className="border-[#CCCCCC] col-span-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
              placeholder="Locality/Town"
            />

            <Input
              value={addressDetail.city}
              onChange={(e) =>
                setAddressDetail({ ...addressDetail, city: e.target.value })
              }
              type="text"
              className="border-[#CCCCCC] col-span-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
              placeholder="City/District"
            />

            <div className="col-span-6 flex gap-3">
              <Input
                value={addressDetail.state}
                onChange={(e) =>
                  setAddressDetail({ ...addressDetail, state: e.target.value })
                }
                type="text"
                className="border-[#CCCCCC] text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
                placeholder="State"
              />
              <Input
                value={addressDetail.postalCode}
                onChange={(e) =>
                  setAddressDetail({
                    ...addressDetail,
                    postalCode: e.target.value,
                  })
                }
                type="number"
                className="border-[#CCCCCC] text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
                placeholder="PIN"
              />
            </div>

            <Input
              value={addressDetail.additionalInstructions}
              onChange={(e) =>
                setAddressDetail({
                  ...addressDetail,
                  additionalInstructions: e.target.value,
                })
              }
              type="text"
              className="border-[#CCCCCC] col-span-6 text-sm focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-full w-full border-[1px] focus:border-gray-400 text-md md:text-sm my-1.5"
              placeholder="Additional Instructions"
            />
          </div>
          <p className="text-md md:text-lg  font-heyComic mt-2">
            Country/Region{' '}
            <span className="font-helveticaRoundedBold text-primary-gray">
              India
            </span>
          </p>
        </div>
      </div>
      <div className="px-5 mt-1 sm:px-5">
        <h1 className="text-lg font-heyComic">Type of Address</h1>
        <div className="flex gap-2 py-2">
          <label className="flex items-center gap-2">
            <Checkbox
              className={`rounded-full border-primary-color border-2 p-2 ${addressDetail.type == AddressType.HOME ? 'bg-primary-color' : 'bg-white'}`}
              checked={addressDetail.type == AddressType.HOME}
              onCheckedChange={(value: boolean) => {
                setAddressDetail({
                  ...addressDetail,
                  type: value ? AddressType.HOME : AddressType.WORK,
                });
              }}
            />
            <span className="font-heyComic">Home</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              className={`rounded-full border-primary-color border-2 p-2 ${addressDetail.type == AddressType.WORK ? 'bg-primary-color' : 'bg-white'}`}
              onCheckedChange={(value: boolean) => {
                setAddressDetail({
                  ...addressDetail,
                  type: value ? AddressType.WORK : AddressType.WORK,
                });
              }}
            />
            <span className="font-heyComic">Work</span>
          </label>
        </div>
      </div>

      {isModal && (
        <div className="grid grid-cols-12 justify-between gap-4 md:gap-10 px-5 pb-3">
          <Button
            onClick={() => {
              onClose();
            }}
            className="font-heyComic col-span-6 border border-secondary-color bg-white rounded-full text-secondary-color hover:bg-secondary-color hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit(addressDetail);
              onClose();
            }}
            className="font-heyComic col-span-6 bg-primary-color rounded-full text-white hover:bg-secondary-color"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressContainer;
