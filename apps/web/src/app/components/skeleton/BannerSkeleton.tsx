import React from 'react';
import { Skeleton } from './Skeleton'; // Adjust the import path as necessary

const BannerSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      <Skeleton className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
};

export default BannerSkeleton;
