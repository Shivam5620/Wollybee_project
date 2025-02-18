import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { mobileNavRoutes } from '../../../utils/routes';
import { signOut, useSession } from 'next-auth/react';
import { ICONS, profileRoutes } from '@repo/ui/lib';
import { MobileLink } from './MobileLink';

function MobileLinkItems({
  color,
  label,
  href,
  onClose,
}: {
  color: string;
  label: string;
  href?: string;
  onClose: () => void;
}) {
  return (
    <Link
      onClick={() => onClose()}
      href={href ? href : ''}
      className={`pt-1 bg-white shadow-sm w-[69px] h-[60px] border-2 border-${color} rounded-md justify-center items-center text-center`}
    >
      <div className="flex justify-center">
        <MobileLink color={`stroke-${color}`} />
      </div>
      <div className="flex-wrap pl-2">
        <p className={`text-xs font-heyComic max-w-[40px] text-${color}`}>
          {label}
        </p>
      </div>
    </Link>
  );
}

const MobileNavBar = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();

  const [showAccountLink, setShowAccountLink] = useState(false);

  return (
    <div className="h-screen">
      <div className="fixed w-[320px] inset-0 overflow-hidden bg-white z-50 top-0">
        <Image
          alt="close"
          onClick={() => {
            onClose();
          }}
          height={60}
          className="absolute top-1 right-0"
          src={ICONS.closeIconModal}
          width={60}
        />

        <div className="absolute top-5 left-4 flex flex-col">
          {mobileNavRoutes.map((a) => (
            <Link
              key={a.url}
              onClick={() => onClose()}
              className={`text-2xl py-2 font-heyComic text-primary-black ${a.label.length > 10 ? 'whitespace-nowrap' : ''}`}
              href={a?.url}
            >
              {a?.label}
            </Link>
          ))}

          {session && session.user ? (
            <div
              onClick={() => {
                setShowAccountLink(!showAccountLink);
              }}
            >
              <p className="flex text-2xl pb-3 font-heyComic text-primary-black">
                My Account{' '}
                <Image
                  alt="close"
                  height={30}
                  className="ml-2"
                  src={ICONS.downCarouselArrow}
                  width={30}
                />
              </p>

              {showAccountLink && (
                <div className="flex flex-col gap-2 z-50">
                  <div className="flex gap-2">
                    <MobileLinkItems
                      onClose={() => onClose()}
                      color="primary-color"
                      label="My Profile"
                      href={profileRoutes.myProfile}
                    />

                    <MobileLinkItems
                      onClose={() => onClose()}
                      color="tertiary-red"
                      label="My Address"
                      href={profileRoutes.address}
                    />
                    <MobileLinkItems
                      onClose={() => onClose()}
                      color="secondary-color"
                      label="My Orders"
                      href={profileRoutes.myOrder}
                    />
                  </div>

                  <div className="flex gap-2">
                    <MobileLinkItems
                      onClose={() => onClose()}
                      color="tertiary-green"
                      label="Change Password"
                      href={profileRoutes.changePassword}
                    />
                    <MobileLinkItems
                      onClose={() => {
                        signOut();
                      }}
                      color="tertiary-red"
                      label="Logout"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              onClick={() => {
                onClose();
              }}
              href="/login"
              className="flex text-3xl font-heyComic text-primary-black"
            >
              Login
            </Link>
          )}
        </div>

        <div className="absolute bottom-0 right-0 overflow-hidden -z-10 w-full">
          <div
            style={{
              backgroundImage: "url('/backgrounds/mobileNavBarFooter.svg')",
              backgroundRepeat: 'no-repeat',
            }}
            className="gap-3 pt-10 w-full"
          >
            <div>
              <Image
                src={ICONS.footerGirl}
                width={70}
                height={70}
                alt="footer Girl"
              />
            </div>

            <div className="flex gap-4 pl-5 mt-5 pb-4 bg-primary-color">
              <Image
                src={ICONS.socials.youtube}
                width={30}
                height={30}
                alt="youtube"
                className="md:w-[43px] w-[30px]  cursor-pointer transition-transform duration-300 transform hover:scale-125"
              />
              <Image
                src={ICONS.socials.instagram}
                width={30}
                height={30}
                alt="instagram"
                className="aspect-square md:w-[40px] w-[29px]  cursor-pointer transition-transform duration-300 transform hover:scale-125"
              />
              <Image
                src={ICONS.socials.facebook}
                width={17}
                height={17}
                alt="facebook"
                className="md:w-[40px] w-[28px] cursor-pointer transition-transform duration-300 transform hover:scale-125"
              />
              <Image
                src={ICONS.socials.linkedin}
                width={30}
                height={30}
                alt="linkedin"
                className="md:w-[42px] w-[30px] cursor-pointer transition-transform duration-300 transform hover:scale-125"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
