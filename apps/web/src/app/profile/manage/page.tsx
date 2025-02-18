import { endpoints, ICONS, profileRoutes } from '@repo/ui/lib';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import ManageAccount from './ManageAccount';
import axios, { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { IUser } from '@repo/ui/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authUtils';
import CustomError from '../../components/common/CustomError';

const ManageProfile = async () => {
  let error = '';
  let data: IUser | null = null;

  const session = await getServerSession(authOptions);
  const id = session?.user?.id;

  try {
    const res: AxiosResponse<IUser> = await ax({
      method: 'get',
      url: `${endpoints.user}/${id}`,
    });
    data = res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <CustomError text={error} />;
  }

  return (
    <div className="flex flex-col px-[10%] xs:px-[17%] mx-auto justify-center">
      <div className="flex mt-6 justify-between items-center w-full relative md:mt-12 md:mb-12">
        <Link href={profileRoutes.myProfile}>
          <Image
            alt="backIcon"
            src={ICONS.carouselArrows.grayLeft}
            width={35}
            className="p-2"
            height={35}
          />
        </Link>
        <p className=" text-2xl md:text-7xl font-cheri  text-tertiary-green absolute left-1/2 -translate-x-1/2">
          My Account
        </p>
        <p></p>
      </div>

      <div>{data && <ManageAccount user={data} />}</div>
    </div>
  );
};

export default ManageProfile;
