'use client';

import { ICONS, profileRoutes } from '@repo/ui/lib';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

const ShowProfileDropdownWrapper = () => {
  const { data: session } = useSession();
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  return (
    <>
      {session && session.user ? (
        <div className="relative z-50">
          <Image
            onMouseEnter={() => {
              setShowProfileDropdown(true);
            }}
            onMouseLeave={() => {
              setShowProfileDropdown(false);
            }}
            alt="profile"
            height={15}
            className="hidden cursor-pointer md:block lg:block xl:w-[65px]"
            src={ICONS.profileIcon}
            width={55}
          />

          {showProfileDropdown && (
            <div
              onMouseEnter={() => {
                setShowProfileDropdown(true);
              }}
              onMouseLeave={() => {
                setShowProfileDropdown(false);
              }}
            >
              <Image
                alt="profile"
                height={15}
                className="absolute top-12 left-1/2 -translate-x-1/2 "
                src={ICONS.profileArrowIcon}
                width={25}
              />
              <div className="shadow-[0px_2px_15px_0px_#00000024] py-5 flex flex-col absolute text-left px-7 font-heyComic top-16 rounded-xl lg:w-[220px] w-[180px] left-1/2 -translate-x-1/2 bg-white text-primary-black lg:text-lg">
              <Link
                  href={profileRoutes.myProfile}
                  className="py-1 hover:text-primary-color cursor-pointer"
                >
                  My Account
                </Link>
                
                <Link
                  href={profileRoutes.myOrder}
                  className="py-1 hover:text-primary-color cursor-pointer"
                >
                  My Orders
                </Link>
                <Link
                  href={profileRoutes.address}
                  className="py-1 hover:text-primary-color cursor-pointer"
                >
                  My Address
                </Link>
                <Link
                  href={profileRoutes.changePassword}
                  className="py-1 hover:text-primary-color cursor-pointer"
                >
                  Change password
                </Link>
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href={profileRoutes.login}>
          <Image
            alt="profile"
            height={15}
            className="w-[55px] hidden md:block "
            src={ICONS.profileIcon}
            width={55}
          />
        </Link>
      )}
    </>
  );
};

export default ShowProfileDropdownWrapper;
