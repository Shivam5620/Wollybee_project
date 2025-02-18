'use client';
import { useEffect, useState } from 'react';
import { ISignInRequestBody } from '@repo/ui/types/auth';
import { signIn, useSession } from 'next-auth/react';
import { setToken } from '@repo/ui/lib/features/authSlice';
import { useAppDispatch } from '../../lib/hooks';
import { Input } from '../../ui/components/ui/input';
import { Button } from '../../ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from '../../ui/components/ui/use-toast';
import Link from 'next/link';
import { profileRoutes } from '@repo/ui/lib';
import HomePageSkeleton from '../components/skeleton/HomePageSkeleton';

const initialValues: ISignInRequestBody = {
  email: '',
  password: '',
};

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

const Login = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sessionStatus] = useState<SessionStatus>('loading');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] =
    useState<ISignInRequestBody>(initialValues);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name, value },
    } = e;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (session && session.user) {
      dispatch(setToken(session));
      // Redirect if already authenticated
      router.push('/');
    }
  }, [session]);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    let redirectURL = '/';
    if (searchParams?.redirect) {
      redirectURL = searchParams?.redirect as string;
      redirectURL += '#product-detail-reviews';
    }
    const result = await signIn('credentials', {
      ...formValues,
      redirect: false,
      callbackUrl: redirectURL,
    });
    setLoading(false); // Always reset loading after login attempt
    if (result?.error) {
      toast({ title: 'Invalid Username or Password', variant: 'destructive' });
      return;
    }
    if (result?.ok) {
      toast({ title: 'Login Successful' });
      router.push(redirectURL);
    }
    setFormValues(initialValues);
  };

  if (loading || status == sessionStatus || status == 'authenticated') {
    let redirectURL = '/';
    if (searchParams?.redirect) {
      redirectURL = searchParams?.redirect as string;
      redirectURL += '#product-detail-reviews';
    }
    router.push(redirectURL);

    return <HomePageSkeleton />;
  }

  // if status is unauthenticated.
  return (
    <div className="mx-auto text-left max-w-[700px] p-5 w-full">
      <h1 className="text-primary-black py-5 font-heyComic text-3xl">
        My Account
      </h1>

      <h1 className="text-primary-black py-5 font-heyComic text-xl">Login</h1>

      <form onSubmit={handleLogin}>
        <label className="text-xs text-primary-gray font-helvetica">
          Username or Email Address
        </label>
        <Input
          className="rounded-full my-1 w-72 sm:w-full"
          type="email"
          required
          name="email"
          value={formValues['email']}
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <label className="text-xs  text-primary-gray font-helvetica">
          Password
        </label>
        <Input
          className="rounded-full my-1 w-72 sm:w-full"
          type="password"
          required
          placeholder="Enter Password"
          name="password"
          value={formValues['password']}
          onChange={handleChange}
        />

        <Button
          className="rounded-full hover:bg-secondary-color text-lg mt-5 w-44 py-3 px-2 bg-primary-color text-white font-heyComic"
          disabled={status == sessionStatus ? true : false}
          type="submit"
        >
          Login
        </Button>
      </form>
      <Link
        href={profileRoutes.signUp}
        className="mt-2 ml-2 text-xs text-primary-gray font-helvetica"
      >
        New User ? Click here to Signup!
      </Link>
    </div>
  );
};

export default Login;
