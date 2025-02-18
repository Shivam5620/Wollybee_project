'use client';
import React, { useState } from 'react';
import { Button } from '../../../ui/components/ui/button';
import { IProduct } from '@repo/ui/types';
import CustomDialog from '../common/CustomDialog';
import BenefitsContainer from './BenefitsContainer';

const BenefitsProductCardButton = ({ product }: { product: IProduct }) => {
  const [showBenefits, setShowBenefits] = useState<boolean>(false);

  return (
    <div>
      <CustomDialog
        className="rounded-2xl sm:rounded-2xl md:rounded-2xl overflow-scroll sm:w-[35%]"
        open={showBenefits}
        Component={
          <BenefitsContainer
            onClose={() => {
              setShowBenefits(false);
            }}
            product={product}
          />
        }
      />

      {!product.isComingSoon ? (
        <Button
          onClick={() => {
            setShowBenefits(true);
          }}
          size="sm"
          className="rounded-full md:text-base text-xs w-full sm:h-10 lg:h-12 border-2 border-primary-color hover:text-white bg-white text-primary-color hover:bg-primary-color xs:block hidden"
        >
          Benefits
        </Button>
      ) : (
        <Button
          size="sm"
          className="rounded-full md:text-base text-xs w-full sm:h-10 lg:h-12 border-2 border-primary-orange bg-white hover:text-white text-primary-orange hover:bg-primary-orange xs:block hidden"
        >
          Coming Soon
        </Button>
      )}
    </div>
  );
};

export default BenefitsProductCardButton;
