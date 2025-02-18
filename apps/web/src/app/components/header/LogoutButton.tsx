'use client';
import { signOut } from 'next-auth/react';
import { resetToken } from '@repo/ui/lib/features/authSlice';
import { useAppDispatch } from '../../../lib/hooks';
import { Button } from '../../../ui/components/ui/button';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Button
      className="bg-white text-left p-0 text-primary-black hover:text-red-500 hover:bg-white m-0 -mt-1 text-md justify-start"
      onClick={() => {
        dispatch(resetToken());
        signOut({ callbackUrl: '/', redirect: false });
        router.push('/');
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
