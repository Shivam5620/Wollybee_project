'use client';
import React from 'react';
import { useAppSelector } from '../../../lib/hooks';
import LoadingBar from '../common/LoadingBar';

const TopLoadingBar = () => {
  const { loading } = useAppSelector((state) => state.cart);

  if (!loading) return null;
  return (
    <div className="absolute top-0 w-screen">
      <LoadingBar />
    </div>
  );
};

export default TopLoadingBar;
