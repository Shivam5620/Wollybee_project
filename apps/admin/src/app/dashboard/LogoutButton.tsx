'use client';
import { signOut } from 'next-auth/react';
import { useAppDispatch } from '../../lib/hooks';
import { resetToken } from '@repo/ui/lib/features/authSlice';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="w-full flex gap-2 text-red-800 text-xs font-bold justify-end">
      Logout
      <Image
        onClick={() => {
          dispatch(resetToken());
          signOut();
        }}
        className="cursor-pointer"
        alt="logout"
        width={15}
        height={15}
        src={ICONS.admin.logoutIcon}
      />
    </section>
  );
};

export default LogoutButton;
