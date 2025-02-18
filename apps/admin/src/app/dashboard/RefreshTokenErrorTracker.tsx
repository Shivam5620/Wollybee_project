'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RefreshTokenErrorTracker = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ redirect: false }).then(() => {
        // Redirect to login page
        router.push('/');
      });
    }
  }, [session, router]);

  return null; // No need to render anything
};

export default RefreshTokenErrorTracker;
