'use client';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ISignInRequestBody } from '@repo/ui/types/auth';
import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useAppDispatch } from '../lib/hooks';
import { setToken } from '@repo/ui/lib/features/authSlice';
import Loader from './components/common/Loader';

const initialValues : ISignInRequestBody = {
  email: '',
  password: '',
}

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

const Page = () => {
  const {data : session, status} = useSession();
  const [sessionStatus] = useState<SessionStatus>('loading');
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<ISignInRequestBody>(initialValues);
  
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name, value },
    } = e;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() =>{
    if(session && session.user){
      dispatch(setToken(session));
      redirect('/dashboard')
    }
  },[session])

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      signIn("credentials", {
        ...formValues,
        redirect : false
      });
      setFormValues(initialValues);
  };

  if(status == "loading"){
    return (
      <Loader text="Loading..." />
    )
  }

  return (
    <div className="mt-28 mx-auto text-left max-w-[500px] p-5 border border-tertiary-green rounded-md shadow-xl w-full">
            <div className='flex justify-center'>
            <Image
              alt="wollybeeLogoAndText"
              height={100}
              priority
              className="my-2"
              src={'/icons/wollybeeLogoAndText.svg'}
              width={150}
            />
            </div>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <Input
          className="my-2"
          type="email"
          required
          name="email"
          value={formValues['email']}
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <label>Password</label>
        <Input 
        className="my-2" 
        type="password" 
        required
        placeholder='Enter Password'
        name="password"
        value={formValues['password']}
        onChange={handleChange}
        />

        <Button className="mt-5 w-full" disabled={status == sessionStatus? true : false} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Page;
