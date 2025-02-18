'use client';
import Link from 'next/link';
import { ITabRoutes, tabRoutes } from '../../../utils/routes';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch } from '../../../lib/hooks';
import {
  setBanners,
  setProducts,
} from '@repo/ui/lib/features/configurationSlice';

export const HeaderTabs = () => {
  const currentPath = usePathname();

  const [hoverTab, setHoverTab] = useState<ITabRoutes>({
    label: '',
    url: '',
    color: '',
  });

  return (
    <div className="no-scrollbar flex font-heyComic md:mx-auto overflow-x-scroll">
      <div className="flex lg:gap-10 md:gap-4 gap-2 -mt-1 mx-auto pb-1">
        {tabRoutes.map((tab) => (
          <Link
            key={tab.url}
            href={tab.url}
            onMouseEnter={() => setHoverTab(tab)}
            onMouseLeave={() =>
              setHoverTab({
                label: '',
                url: '',
                color: '',
              })
            }
          >
            <div
              className="text-center relative " // Added 'relative' here
            >
              <p
                style={{
                  color:
                    hoverTab.url === tab.url
                      ? tab.color
                      : currentPath === tab.url
                        ? tab.color
                        : '', // Apply dynamic color on hover
                }}
                className={`hover:text-[${tab.color}] relative mb-1 text-center px-2 whitespace-nowrap text-[16px] xl:text-xl md:text-lg`}
              >
                {tab?.label}
                {(tab.label === hoverTab.label || currentPath === tab.url) && (
                  <svg
                    className="absolute left-0 sm:-bottom-[7px] -bottom-[4px]  w-full h-[6px] sm:h-[8px] z-10" // Ensure it is positioned correctly and on top
                    viewBox="0 0 100 10" // Adjust viewBox if needed
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 3.07956C5.0485 5.89634 9.09186 7.6211 13.402 7.94329C17.7122 8.26548 22.0061 7.16394 25.5105 4.83699C26.3097 4.31709 27.2649 4.03787 28.2443 4.03787C29.2236 4.03787 30.1788 4.31709 30.978 4.83699C34.0668 6.89296 37.784 8 41.5988 8C45.4135 8 49.1307 6.89296 52.2195 4.83699C53.0186 4.31709 53.9739 4.03787 54.9532 4.03787C55.9326 4.03787 56.8878 4.31709 57.687 4.83699C60.7758 6.89296 64.493 8 68.3077 8C72.1225 8 75.8397 6.89296 78.9285 4.83699C79.7245 4.30997 80.6809 4.02637 81.6622 4.02637C82.6436 4.02637 83.6 4.30997 84.396 4.83699C88.1288 7.30609 92.7409 8.38603 97.3052 7.85973C101.87 7.33343 106.048 5.23991 109 2"
                      stroke={tab.color}
                      strokeWidth="4"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
