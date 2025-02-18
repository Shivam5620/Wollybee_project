'use client';
import Image from 'next/image';
import { Button } from '../../../ui/components/ui/button';
import { ICONS, socialLinks } from '@repo/ui/lib';
import Link from 'next/link';

const FooterJoinNowButton = () => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={ICONS.whatsappIcon}
        width={60}
        className="fill-white hover:scale-125 transition-all"
        height={60}
        alt="whatsapp"
      />
      <Link
        target="_blank"
        href={socialLinks.whatsapp}
        onClick={() => {}}
        className="xl:text-2xl hover:scale-110 transition-all text-xl font-heyComic px-10 bg-whatsapp-green rounded-full xl:py-3.5 h-auto py-2.5 text-white"
      >
        <p className="mx-2">Join Now</p>
      </Link>
    </div>
  );
};

export default FooterJoinNowButton;
