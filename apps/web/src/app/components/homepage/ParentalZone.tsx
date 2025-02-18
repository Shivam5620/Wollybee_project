import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import DiveInHomePageButton from './DiveInHomePageButton';
import ParentalZoneCarousel from './ParentalZoneCarousel';

const ParentalZone = () => {
  return (
    <div className="relative md:mt-40 mt-20 flex flex-col-reverse md:flex-row">
      <div className="relative sm:w-1/2 w-full items-center h-[254px] sm:h-[454px] bg-parental-zone-cloud bg-no-repeat">
        <div className=" flex items-center h-full sm:mr-20 justify-center">
          <ParentalZoneCarousel />
        </div>
      </div>
      <div className="flex flex-col ml-3 mt-4 px-10">
        <p className="text-5xl font-cheri text-tertiary-red">Parental Zone</p>
        <p className="font-heyComic text-2xl py-4 text-venetian-red">
          BLOG HEADING
        </p>

        <p className="font-heyComic mt-5 max-w-80 text-venetian-red">
          Now, it’s time we halt at a different stop on our WOLLYFUL journey!
          Let’s take a look at all the insights, updates & tales from Wollybee!
        </p>
        <div className="mt-5 text-center">
          <DiveInHomePageButton />
        </div>
      </div>
      <Image
        className="hidden md:block absolute p-5 bottom-7 right-24"
        src={ICONS.femalePanda}
        width={230}
        height={300}
        alt="ParentalZone"
      />
    </div>
  );
};

export default ParentalZone;
