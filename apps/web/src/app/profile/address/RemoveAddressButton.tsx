'use client';

import { IAddress } from '@repo/ui/types/address';
import { removeAddress } from './address.action';
import { useState } from 'react';
import { toast } from '../../../ui/components/ui/use-toast';
import { Trash2, Loader } from 'lucide-react';

const RemoveAddressButton = ({ address }: { address: IAddress }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleRemoveAddress = async () => {
    setLoading(true);
    const res = await removeAddress(address.id ?? -1);
    if ('error' in res) {
      toast({ title: res.error.message, variant: 'destructive' });
    }
    if ('success' in res) {
      toast({ title: res.message });
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader className="text-tertiary-red cursor-pointer" size={26} />;
  }

  return (
    <Trash2
      onClick={handleRemoveAddress}
      className="text-tertiary-red cursor-pointer"
      size={26}
    />
  );
};

export default RemoveAddressButton;
