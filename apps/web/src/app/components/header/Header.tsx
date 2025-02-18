import Image from 'next/image';
import Link from 'next/link';
import { ICONS } from '@repo/ui/lib';
import { AdvertisementComponent } from './AdvertisementBanner';
import { HeaderTabs } from './HeaderTabs';
import MobileNavBarWrapper from './MobileNavBarWrapper';
import ShowProfileDropdownWrapper from './ShowProfileDropdownWrapper';
import SearchContainerWrapper from '../search/SearchContainerWrapper';
import UserCartDetails from '../cart/UserCartDetails';
import GetConfigurationsState from './GetConfigurationsState';
import TopLoadingBar from './TopLoadingBar';

const Header = () => {
  return (
    <>
      <header
        id="wollybee-header"
        className={`bg-transparent z-[49] sticky top-0 text-center transition-transform -mb-[5px] xs:-mb-[8.5px]  md:-mb-[6.5px] shadow-[1px_2px_10px_2px_#0000001b]`}
      >
        <div className="bg-white pb-2 md:pb-2">
          <TopLoadingBar />
          <AdvertisementComponent text="Get free gift on orders Above Rs.999/-" />

          <div className="flex justify-between items-center md:px-16 mt-2 lg:mt-3 mb-2 relative px-4">
            <div className="flex">
              <Link
                href="/"
                className="hidden md:block absolute left-[5%] xl:top-[10%] md:top-[7%]"
              >
                <Image
                  alt="navbarIcon"
                  height={15}
                  priority
                  src={ICONS.navbarIcon}
                  width={55}
                  className="xl:w-[80px] md:w-[60px]"
                />
              </Link>
              <MobileNavBarWrapper />
            </div>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            >
              <Image
                alt="wollybeeLogoAndText"
                height={100}
                priority
                className="p-4 md:p-0"
                src={ICONS.wollyBeeLogoAndText}
                width={200}
              />
            </Link>

            <div className="flex md:gap-2 xs:gap-0.5  items-center justify-between ">
              <SearchContainerWrapper />
              <ShowProfileDropdownWrapper />
              <UserCartDetails />
            </div>
          </div>
          <HeaderTabs />
        </div>
      </header>

      <GetConfigurationsState />
    </>
  );
};

export default Header;
