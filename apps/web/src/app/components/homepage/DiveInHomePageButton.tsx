'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../../../ui/components/ui/button';
import { navBarRoutesClient } from '@repo/ui/lib/constants';

const DiveInHomePageButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-full">
      {' '}
      {/* Centering container */}
      <Button
        onClick={() => {
          router.push(navBarRoutesClient.whyWollybee);
        }}
        className="rounded-full bg-tertiary-red hover:scale-110 hover:bg-tertiary-red transition-all py-4 px-6 xs:py-6 xs:px-10 font-heyComic text-base xs:text-xl md:text-2xl"
      >
        See what makes us special
      </Button>
    </div>
  );
};

export default DiveInHomePageButton;
