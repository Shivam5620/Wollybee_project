import { ICONS, navBarRoutesClient } from '@repo/ui/lib';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { usePathname, useRouter } from 'next/navigation';

interface NavItemComponentProps {
  image: string;
  text: string;
  color: string;
  href: string;
  className: ClassNameValue;
  backgroundImage: string;
  whiteIcon: string;
}

interface BottomNavMenuProps {
  isCartEmpty: boolean;
  showAddToBasket: boolean;
}

const NavItemComponent = ({
  image,
  text,
  color,
  href,
  className,
  backgroundImage,
  whiteIcon,
}: NavItemComponentProps) => {
  const pathName = usePathname();

  return (
    <div className="relative">
      {pathName == href && (
        <Image
          className={'z-0 absolute h-full w-full ' + className}
          src={backgroundImage}
          height={50}
          width={50}
          alt={text}
        />
      )}
      <Link
        href={href}
        className={twMerge(`z-10 flex flex-col items-center gap-1`, '')}
      >
        {!(pathName == href) ? (
          <Image
            className="z-10"
            src={image}
            height={25}
            width={25}
            alt={text}
          />
        ) : (
          <Image
            className="z-10"
            src={whiteIcon}
            height={25}
            width={25}
            alt={text}
          />
        )}
        {text && (
          <p
            className={`z-10 font-heyComic ${!(pathName == href) ? `text-${color}` : 'text-white'} xs:text-xs text-[10px] `}
          >
            {text}
          </p>
        )}
      </Link>
    </div>
  );
};

const BottomNavMenu = ({
  isCartEmpty,
  showAddToBasket,
}: BottomNavMenuProps) => {
  const router = useRouter();

  const handleBestSellersClick = async () => {
    router.push(`${navBarRoutesClient.shopAllBestSellers}`);
  };

  return (
    <div className="fixed bottom-0 z-[29] w-full shadow-[0px_14px_26px_8px_#00000062] md:hidden rounded-tr-2xl rounded-tl-2xl">
      <div
        className={`w-full pb-3 px-[5%] max-h-[4.4rem] bg-white  ${!(!isCartEmpty || showAddToBasket) ? 'rounded-tr-2xl rounded-tl-2xl' : ''}   flex justify-between items-end z-[10]`}
      >
        <NavItemComponent
          image={ICONS.bottomNav.shopAll}
          text="Shop All"
          color="primary-color"
          href={navBarRoutesClient.shopAll}
          backgroundImage={ICONS.bottomNav.shopAllActive}
          whiteIcon={ICONS.bottomNav.shopAllWhite}
          className="scale-150 "
        />
        <NavItemComponent
          image={ICONS.bottomNav.categories}
          text="Categories"
          color="tertiary-red"
          backgroundImage={ICONS.bottomNav.categoriesActive}
          href={navBarRoutesClient.shopByInterest}
          whiteIcon={ICONS.bottomNav.categoriesWhite}
          className="scale-150 "
        />

        <Image
          src={ICONS.navbarIcon}
          width={70}
          height={70}
          alt="TTL page"
          className={`${!(!isCartEmpty || showAddToBasket) ? '-translate-y-1' : 'w-[60px] translate-y-1'} -translate-x-[5.5%] [transition:all_cubic-bezier(0.4,_0,_0.2,_1)_.3s]`}
          onClick={() => router.push('/')}
        />
        <NavItemComponent
          image={ICONS.bottomNav.giftHamper}
          text="Gifting"
          color="secondary-color"
          backgroundImage={ICONS.bottomNav.giftHamperActive}
          whiteIcon={ICONS.bottomNav.giftHamperWhite}
          href={navBarRoutesClient.comboAndGifts}
          className="scale-150"
        />

        <div onClick={handleBestSellersClick} className="cursor-pointer">
          <NavItemComponent
            image={ICONS.bottomNav.bestSeller}
            text="Best Sellers"
            color="tertiary-green"
            backgroundImage={ICONS.bottomNav.bestSellerActive}
            whiteIcon={ICONS.bottomNav.bestSellerWhite}
            href={navBarRoutesClient.shopAllBestSellers}
            className="scale-150"
          />
        </div>

        <Image
          alt="Curve"
          width={170}
          height={100}
          src={ICONS.bottomNav.navBarCurve}
          className={`absolute bottom-[4.4rem] z-[-1] left-1/2 -translate-x-1/2 ${!(!isCartEmpty || showAddToBasket) ? '' : ' translate-y-72 rounded-none'} [transition:all_cubic-bezier(0.4,_0,_0.2,_1)_.3s]`}
        />
      </div>
    </div>
  );
};

export default BottomNavMenu;
