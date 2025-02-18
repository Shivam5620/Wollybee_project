'use client';
import { useState } from 'react';
import { ISignUpRequestBody } from '@repo/ui/types/auth';
import { Input } from '../../ui/components/ui/input';
import { Button } from '../../ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from '../../ui/components/ui/use-toast';
import Link from 'next/link';
import { profileRoutes } from '@repo/ui/lib';
import { createUser } from './user.action';
import HomePageSkeleton from '../components/skeleton/HomePageSkeleton';

const SignUp = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [verifyOTPView, setVerifyOTPView] = useState<boolean>(false);
  const [otp, setOTP] = useState<number>(0);

  const initialState: ISignUpRequestBody = {
    name: '',
    email: '',
    password: '',
    mobile: '',
  };

  const [formValues, setFormValues] =
    useState<ISignUpRequestBody>(initialState);

  const handleVerifyOTPAndSubmit = async () => {
    setLoading(true);
    const data = await createUser({
      ...formValues,
      mobile: formValues.mobile,
      roleId: 1,
    });
    setLoading(false);
    if ('error' in data) {
      toast({ title: data.error.message, variant: 'destructive' });
    }
    if ('success' in data) {
      toast({ title: data.message });
      router.push(`${profileRoutes.login}`);
    }
  };

  const handleSignup = async () => {
    if (formValues.mobile.length != 10) {
      toast({ title: 'Please enter a valid mobile number!' });
      return;
    }

    if (!formValues.email || !formValues.password || !formValues.name) {
      toast({ title: 'Please fill all the fields!' });
      return;
    }

    setLoading(true);

    toast({ title: 'OTP Sent successfully!!' });

    setVerifyOTPView(true);
    setLoading(false);
  };

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="mx-auto text-left max-w-[700px] p-5 w-full">
      <h1 className="text-primary-black py-5 font-heyComic text-3xl">
        Register to Wollybee!!
      </h1>

      <label className="text-xs text-primary-gray font-helvetica">Name</label>
      <Input
        className="rounded-full my-1 w-72 sm:w-full"
        type="text"
        required
        name="name"
        value={formValues['name']}
        onChange={(e) => {
          setFormValues({
            ...formValues,
            name: e.target.value,
          });
        }}
        placeholder="Enter Name"
      />

      <label className="text-xs text-primary-gray font-helvetica">
        Username or Email Address
      </label>
      <Input
        className="rounded-full my-1 w-72 sm:w-full"
        type="email"
        required
        name="email"
        value={formValues['email']}
        onChange={(e) => {
          setFormValues({
            ...formValues,
            email: e.target.value,
          });
        }}
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
        onChange={(e) => {
          setFormValues({
            ...formValues,
            password: e.target.value,
          });
        }}
      />

      <label className="text-xs  text-primary-gray font-helvetica">
        Mobile Number
      </label>
      <Input
        className="rounded-full my-1 w-72 sm:w-full"
        type="text"
        required
        placeholder="Enter Mobile Number"
        name="mobile"
        value={formValues['mobile']}
        onChange={(e) => {
          setFormValues({
            ...formValues,
            mobile: e.target.value,
          });
        }}
      />

      {!verifyOTPView ? (
        <Button
          className="rounded-full hover:bg-secondary-color text-lg mt-5 w-44 py-3 px-2 bg-primary-color text-white font-heyComic"
          onClick={handleSignup}
        >
          Send OTP
        </Button>
      ) : (
        <div>
          <label className="text-xs text-primary-gray font-helvetica">
            Enter OTP
          </label>
          <Input
            className="rounded-full my-1 w-72 sm:w-full"
            type="number"
            required
            name="otp"
            value={otp}
            onChange={(e) => {
              setOTP(parseInt(e.target.value, 10));
            }}
            placeholder="Enter OTP"
          />

          <Button
            className="rounded-full hover:bg-secondary-color text-lg mt-5 w-44 py-3 px-2 bg-primary-color text-white font-heyComic"
            onClick={handleVerifyOTPAndSubmit}
          >
            Verify and Submit!
          </Button>
        </div>
      )}

      <div>
        <Link
          href={profileRoutes.login}
          className="ml-2 mt-2 text-xs text-primary-gray font-helvetica"
        >
          Existing User ? Click here to Log in!
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
