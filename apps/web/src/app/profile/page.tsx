import { ICONS, profileRoutes } from '@repo/ui/lib';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/authUtils';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import Image from 'next/image';

const ProfileCards = ({
  label,
  href,
  className,
  description,
}: {
  label: string;
  href: string;
  className: ClassNameValue;
  description: string;
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'rounded-xl flex gap-4 p-3 items-start w-full xs:max-w-[300px] md:min-h-[150px] ',
        className,
      )}
    >
      <div className="bg-white-smoke rounded-sm  xs:min-w-[70px] w-[60px] md:m-2 xs:h-[70px] h-[60px]"></div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-heyComic ">{label}</p>
          <p className="font-helveticaRoundedBold leading-[1.3rem] hidden xs:block ">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return (
    <div className="h-[70vh] w-full px-[10%] xs:px-[17%] py-10">
      <h1 className="flex sm:gap-10 items-center md:text-6xl text-2xl font-cheri text-center text-tertiary-red pb-10">
       <Image 
       className='p-5 sm:p-0'
       alt='profileIcon'
       src={ICONS.myProfileIcon}
       width={120}
       height={120}
       />
       Hello, {session.user.name}
      </h1>
      <div className="grid w-full items-start gap-4 grid-cols-12">
        <ProfileCards
          label="My Orders"
          href={profileRoutes.myOrder}
          className="border-primary-color border-2 transition-all hover:text-white hover:bg-primary-color text-primary-color xl:col-span-4 md:col-span-6 col-span-12 justify-self-center"
          description="Track your orders, or buy again"
        />
        <ProfileCards
          label="My Address"
          href={profileRoutes.address}
          className="border-tertiary-red border-2 transition-all hover:text-white hover:bg-tertiary-red text-tertiary-red xl:col-span-4 md:col-span-6 col-span-12 justify-self-center"
          description="Add or Edit addresses for your orders"
        />
        <ProfileCards
          label="My Account"
          href={profileRoutes.manageProfile}
          className="border-tertiary-green border-2 transition-all hover:text-white hover:bg-tertiary-green text-tertiary-green xl:col-span-4 md:col-span-6 col-span-12 justify-self-center"
          description="Edit login, name, and mobile number"
        />
      </div>
    </div>
  );
};

export default Profile;
