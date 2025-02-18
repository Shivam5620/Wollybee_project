// components/Whatsapp.js

import { ICONS, socialLinks } from '@repo/ui/lib';
import Image from 'next/image';
import Link from 'next/link';

const Whatsapp = () => {
  return (
    <Link
      href={socialLinks.whatsappChat}
      target="_blank"
      rel="noopener noreferrer"
      className="z-[200] fixed bottom-[20%] sm:bottom-4 right-2 md:right-4 bg-white p-1 rounded-full shadow-[2px_3px_20px_5px_#00000010] transition transform hover:scale-110"
    >
      <Image
        src={ICONS.whatsappIcon}
        width={50}
        height={50}
        alt="whatsapp"
        className="w-[40px] h-[40px] p-1"
      />
    </Link>
  );
};

export default Whatsapp;
