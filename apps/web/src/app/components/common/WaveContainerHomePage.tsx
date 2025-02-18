import Image from 'next/image';
import React from 'react';

const WaveContainerHomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full relative">
      <Image
        src={'/backgrounds/waveBgHome1.svg'}
        width={500}
        height={500}
        className="w-full h-full md:block hidden min-w-[1300px] "
        alt="Wave Background"
      />
      <Image
        src={'/backgrounds/waveBgHomeMobile1.svg'}
        width={500}
        height={500}
        className="w-full h-full md:hidden"
        alt="Wave Background"
      />

      {children}
    </div>
  );
};

export default WaveContainerHomePage;
