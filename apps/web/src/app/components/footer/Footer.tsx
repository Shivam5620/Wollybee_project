'use client';

import Image from 'next/image';
import Link from 'next/link';
import FooterJoinNowButton from './FooterJoinNowButton';
import { ICONS, navBarRoutesClient, routes, socialLinks } from '@repo/ui/lib';
import { usePathname } from 'next/navigation';
// import YoutubeContainer from '../homepage/YoutubeContainer';
import HomePageFooterWave from '../common/HomePageFooterWave';
import { OurStoryFaq } from '../../our-story/OurStoryFAQ';
import dynamic from 'next/dynamic';
import { useAppSelector } from '../../../lib/hooks';
import ProductMoreWaysToPlayWrapper from '../../product/detail/[productId]/ProductMoreWaysToPlayWrapper';
import ProductMoreWaysToPlay from '../../product/detail/[productId]/ProductMoreWaysToPlay';
import { ProductMoreWaysToPlayFooter } from './ProductMoreWaysToPlayFooter';

export const DynamicYoutubeContainer = dynamic(
  () => import('../homepage/YoutubeContainer'),
  { ssr: false },
);

// Server Component (Client currently development)
const FooterDefault = () => {
  return (
    <div className="bg-primary-color">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[5%] w-full pt-6 md:-mt-10 md:flex relative bg-primary-color md:text-left text-center justify-between gap-12 items-center">
        <div>
          <div className="flex xs:gap-5 gap-3 justify-center md:justify-left">
            <Image
              width={80}
              height={50}
              src={ICONS.wollybeeFooterIcon}
              alt="footerIcon"
              className=" w-[60px] xs:w-[80px]"
            />
            <Image
              width={200}
              height={64}
              src={ICONS.wollybeeFooterText}
              alt="footerText"
              className="xs:w-[200px] w-[140px] md:ml-0 md:mr-auto"
            />
          </div>

          <p className="font-heyComic text-white pt-6 text-xs md:text-sm lg:text-lg xl:text-xl text-nowrap">
            Join our WhatsApp Community now and
          </p>
          <p className="font-heyComic text-white pb-3 text-xs md:text-sm lg:text-lg xl:text-xl text-nowrap">
            unlock a world of learning and fun for your kids!
          </p>

          <div className="flex md:justify-start justify-center items-center gap-4 pb-4 md:mt-3">
            <FooterJoinNowButton />
          </div>
        </div>

        <div className="sm:mt-8">
          <div className="text-[11px] sm:text-lg lg:text-lg xl:text-lg text-white font-heyComic flex gap-x-7 lg:gap-x-10 gap-y-2 justify-center md:gap-x-7 py-1 flex-wrap">
            <Link
              className="hover:text-primary-black"
              href={navBarRoutesClient.shopAll}
            >
              Shop All
            </Link>
            <Link
              className="hover:text-primary-black"
              href={navBarRoutesClient.careers}
            >
              Careers
            </Link>
            <Link
              className="hover:text-primary-black"
              href={navBarRoutesClient.contactUs}
            >
              Contact
            </Link>
            <Link
              className="hover:text-primary-black"
              href={navBarRoutesClient.trackOrder}
            >
              Track your order
            </Link>
            <Link
              className="hover:text-primary-black"
              href={navBarRoutesClient.faq}
            >
              FAQs
            </Link>
          </div>

          <div className="text-center items-center md:justify-end justify-center flex md:gap-10 xs:gap-8 gap-10 p-2 mt-2 md:mt-8">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={socialLinks.youtube}
            >
              <Image
                src={ICONS.socials.youtube}
                alt="youtube"
                className="lg:w-[47px] md:w-[43px] w-[30px]  cursor-pointer transition-transform duration-300 transform hover:scale-125"
                width={43}
                height={43}
              />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={socialLinks.instagram}
            >
              <Image
                src={ICONS.socials.instagram}
                alt="instagram"
                className="lg:w-[42px] md:w-[40px] w-[29px]  cursor-pointer transition-transform duration-300 transform hover:scale-125"
                width={50}
                height={50}
              />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={socialLinks.facebook}
            >
              <Image
                src={ICONS.socials.facebook}
                alt="facebook"
                className="lg:w-[42px] md:w-[40px] w-[28px] cursor-pointer transition-transform duration-300 transform hover:scale-125"
                width={43}
                height={43}
              />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={socialLinks.linkedin}
            >
              <Image
                src={ICONS.socials.linkedin}
                alt="linkedin"
                className="lg:w-[45px] md:w-[42px] w-[30px] cursor-pointer transition-transform duration-300 transform hover:scale-125"
                width={43}
                height={43}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <div className="absolute w-full max-h-[320px] overflow-hidden">
            <Image
              priority
              className="w-full  object-cover bg-primary-color"
              src={ICONS.footerCloud}
              alt="footer"
              width={1350}
              height={320}
            />
          </div>

          <div className="absolute flex-col left-1/2 -translate-x-1/2 top-10 md:top-20 xl:top-[8vh] lg:mt-10 xl:mt-24 w-full text-gray-500">
            <div className="flex sm:pt-10 gap-3 md:gap-x-16 xs:gap-y-3 gap-y-1 md:py-5 lg:py-2 pt-4 pb-4 md:pb-0 text-[10px] xs:text-sm md:text-xl font-helveticaRoundedBold justify-center flex-wrap md:px-[10%]">
              <Link
                className="z-10 hover:text-primary-color text-nowrap"
                href={routes.privacyPolicy}
              >
                Privacy Policy
              </Link>
              <Link
                className="z-10 hover:text-primary-color text-nowrap"
                href={routes.termsAndConditions}
              >
                Terms and Conditions
              </Link>
              <Link
                className="z-10 hover:text-primary-color text-nowrap"
                href={routes.returnPolicy}
              >
                Return Policy
              </Link>
              <Link
                className="z-10 hover:text-primary-color text-nowrap"
                href={routes.shippingPolicy}
              >
                Shipping Policy
              </Link>
            </div>

            <div className="md:px-[10%] px-[5%] md:w-[80%] mx-auto pb-36 md:pb-4 mt-3 text-center">
              <p className="text-[7px] md:text-xs font-helvetica">
                The Tales of Tonny the Monny related trademarks and characters
                TM & ©️ Wollybee LLP. All audio, visual and textual content on
                this site (including all names, characters, images, trademarks,
                and logos) are protected by trademarks, copyrights and other
                Intellectual Property rights owned by Wollybee LLP. The Tales of
                Tonny the Monny created by Ali Asgar Ali & Batul Ali.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ youtubeLink }: { youtubeLink: string }) => {
  const pathname = usePathname();
  const { faqCategories } = useAppSelector((state) => state.faq);
  const { product } = useAppSelector((state) => state.product);

  if (pathname.startsWith(`${routes.productDetail}`)) {
    return (
      <div className="md:mt-20 mt-10">
        {product && (
          <ProductMoreWaysToPlayFooter
            className="-mb-[7.5rem]"
            product={product}
          />
        )}
        <HomePageFooterWave color="#ffc648">
          <FooterDefault />
        </HomePageFooterWave>
      </div>
    );
  } else if (pathname.startsWith(`${navBarRoutesClient.ourStory}`)) {
    return (
      <div className="md:mt-20 mt-10">
        <OurStoryFaq faqData={faqCategories} className="-mb-[7.5rem]" />;
        <HomePageFooterWave color="#ffc648">
          <FooterDefault />
        </HomePageFooterWave>
      </div>
    );
  } else if (pathname === '/' || pathname === '') {
    return (
      <div>
        <DynamicYoutubeContainer
          className="-mb-[10.5rem]"
          youtubeLink={youtubeLink}
        />
        <HomePageFooterWave color="#ffc648">
          <FooterDefault />
        </HomePageFooterWave>
      </div>
    );
  } else if (pathname.startsWith(`${navBarRoutesClient.whyWollybee}`)) {
    return (
      <div className="xs:-mt-[107%] -mt-[150%] ">
        <div className="relative xs:-mb-20 -mb-6 z-[9] ">
          <Image
            alt="footer"
            src={ICONS.whyWollybee.footer}
            width={100}
            height={100}
            className="w-full relative z-[9]"
          />
          <Image
            alt="footer"
            src={ICONS.whyWollybee.footerClouds}
            width={100}
            height={100}
            className="absolute w-full -top-[45%] left-0 z-[1]"
          />
        </div>

        <HomePageFooterWave color="#ffc648">
          <FooterDefault />
        </HomePageFooterWave>
      </div>
    );
  }
  return (
    <HomePageFooterWave color="#ffc648">
      <FooterDefault />
    </HomePageFooterWave>
  );
};

export default Footer;
