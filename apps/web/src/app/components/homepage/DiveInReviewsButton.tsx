'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../../../ui/components/ui/button';

const DiveInReviewsButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push('/reviews');
      }}
      className="bg-tertiary-red text-white font-heyComic rounded-full px-5 sm:px-10 sm:py-2 mb-5 hover:scale-110"
    >
      Dive in
    </Button>
  );
};

export default DiveInReviewsButton;
