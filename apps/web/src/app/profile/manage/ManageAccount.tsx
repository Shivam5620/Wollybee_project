'use client';
import React, { useState } from 'react';
import { Input } from '../../../ui/components/ui/input';
import { Button } from '../../../ui/components/ui/button';
import { toast } from '../../../ui/components/ui/use-toast';
import { updateProfile } from './user.action';
import { useAppDispatch } from '../../../lib/hooks';
import { setLoading } from '@repo/ui/lib/features/cartSlice';
import { IUser } from '@repo/ui/types';
import { useRouter } from 'next/navigation';
import { profileRoutes } from '@repo/ui/lib';

const ManageAccount = ({ user }: { user: IUser }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [name, setName] = useState<string>(user.name);
  const [mobile, setMobile] = useState<string>(user.mobile);

  const handleSaveDetails = async () => {
    const payload = {
      name,
      mobile,
    };

    if (!name || !mobile || payload.mobile.length !== 10) {
      toast({
        title: 'Please fill all fields correctly',
        variant: 'destructive',
      });
      return;
    }
    dispatch(setLoading(true));
    const res = await updateProfile(user.id, payload);
    dispatch(setLoading(false));
    if ('success' in res) {
      toast({ title: res.message });
      router.push(profileRoutes.myProfile);
    }
    if ('error' in res) {
      toast({ title: res.error.message, variant: 'destructive' });
    }
  };
  return (
    <div className="flex flex-col md:gap-6 gap-3">
      <Input
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        type="number"
        className="col-span-6 text-sm py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-lg w-full border-[1px] border-gray-400 focus:border-gray-400 text-md md:text-sm my-2"
        placeholder="Mobile Number"
      />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="col-span-6 text-sm py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-lg w-full border-[1px] border-gray-400 focus:border-gray-400 text-md md:text-sm my-2"
        placeholder="Full name"
      />

      <Input
        disabled
        value={user.email}
        type="email"
        className="col-span-6 text-sm py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-color px-3 font-helvetica rounded-lg w-full border-[1px] border-gray-400 focus:border-gray-400 text-md md:text-sm my-2"
        placeholder="Email Address"
      />

      <div className="flex justify-end">
        <Button
          disabled={name === '' || mobile === ''}
          onClick={handleSaveDetails}
          className="w-44 bg-primary-color hover:bg-secondary-color font-bold rounded-full text-white"
        >
          Save Details
        </Button>
      </div>
    </div>
  );
};

export default ManageAccount;
