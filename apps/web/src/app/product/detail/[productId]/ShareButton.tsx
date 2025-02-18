'use client';

import { ICONS } from '@repo/ui/lib';
import Image from 'next/image';
import React from 'react';

const ShareButton = ({ shareData }: { shareData: object }) => {

  const handleShareClick = () => {
 
    if (navigator.share) {
      try {
        navigator.share({ ...shareData, url: window.location.href });
      } catch (error) {
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(
        'Web Share API is not supported in your browser. You can copy the link manually.',
      );
    }
  };
  return (
    <Image
      className="cursor-pointer"
      src={ICONS.shareIcon}
      alt="share"
      width={30}
      height={30}
      onClick={handleShareClick}
    />
  );
};

export default ShareButton;
