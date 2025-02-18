'use client';

import { IAddress } from '@repo/ui/types/address';
import { Button } from '../../../ui/components/ui/button';
import { useState } from 'react';
import { setAsDefault } from './address.action';
import { toast } from '../../../ui/components/ui/use-toast';
import { Loader } from 'lucide-react';

const SetAddressAsDefaultButton = ({ address }: { address: IAddress }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsDefaultClicked = async () => {
    setLoading(true);
    const res = await setAsDefault(address.id ?? -1);
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
    <Button
      onClick={handleSetAsDefaultClicked}
      className="px-5 my-2 w-full rounded-full py-1.5 h-8 xs:h-auto  xs:py-2 border border-secondary-color bg-transparent text-secondary-color hover:bg-secondary-color hover:text-white text-sm xs:text-md"
    >
      SET AS DEFAULT
    </Button>
  );
};

export default SetAddressAsDefaultButton;
