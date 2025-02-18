'use client';

import { useState } from 'react';
import CustomDrawer from '../common/CustomDrawer';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import MobileNavBar from './MobileNavBar';
import { Sheet, SheetContent } from '../../../ui/components/ui/sheet';

const MobileNavBarWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        alt="hamburgerIcon"
        onClick={() => {
          setIsOpen(true);
        }}
        height={6}
        className="md:hidden"
        src={ICONS.hamburgerIcon}
        width={27}
      />

      <Sheet open={isOpen}>
        <SheetContent side={'left'}>
          <MobileNavBar onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavBarWrapper;
