'use client';

import { useState } from 'react';
import SearchContainer from './SearchContainer';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import CustomDialog from '../common/CustomDialog';

const SearchContainerWrapper = () => {
  const [showSearchView, setShowSearchView] = useState<boolean>(false);

  return (
    <div className="relative">
      <Image
        onClick={() => setShowSearchView(true)}
        alt="search"
        height={15}
        className="xl:w-[65px] md:w-[55px] w-[40px] md:-mb-2"
        src={ICONS.searchIcon}
        width={55}
      />
      {showSearchView && (
        <CustomDialog
          Component={<SearchContainer close={() => setShowSearchView(false)} />}
          open={showSearchView}
          className="h-screen md:mt-14 w-screen md:h-[190px] md:items-center md:top-1 rounded-none sm:rounded-none md:rounded-none lg:rounded-none"
        />
      )}
    </div>
  );
};

export default SearchContainerWrapper;
