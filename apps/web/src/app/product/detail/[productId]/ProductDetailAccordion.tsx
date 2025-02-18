'use client';
import { useEffect, useRef, useState } from 'react';
import CustomTabs from './CustomTabs';
import { ChevronDown, ChevronRight } from 'lucide-react';
import BubbleTip from '../../../components/common/BubbleTip';
import { IProduct } from '@repo/ui/types';
import { setAccordionLocation } from '@repo/ui/lib/features/productSlice';
import { useAppDispatch } from '../../../../lib/hooks';

const ProductDetailAccordion = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const openAccordionRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(product.additionalInfo?.[0] ?? {
    title: '',
    color: '',
    tabs: [],
  });

  useEffect(() => {
    if (openAccordionRef.current) {
      // Set the height of the accordion when it opens
      dispatch(setAccordionLocation(openAccordionRef.current.offsetHeight));
    } else {
      dispatch(setAccordionLocation(0));
    }
  }, [selected, openAccordionRef.current]);

  return (
    <div className='hidden md:my-5 lg:my-10 md:block w-full justify-center'>
    <div className="lg:mx-10 gap-4 grid grid-cols-12">
      <div className="col-span-2 xl:block hidden"></div>
      <div className="col-span-10">
        {product.additionalInfo?.map((a, index) => (
          <div key={index} className="relative flex gap-4 my-2 ">
            <div
              style={{
                borderColor: a.color,
                color: selected.title == a.title ? 'white' : a.color,
                backgroundColor: (selected.title == a.title) ? a.color : '',
              }}
              onClick={() => {
                setSelected(a);
              }}
              className={`flex justify-between lg:gap-0 gap-4 lg:px-10 px-4 py-3 rounded-full lg:w-72 border-2 font-heyComic text-center cursor-pointer my-2 lg:text-xl text-lg `}
            >
              <p>{a.title}</p>
              {selected.title == a.title ? <ChevronDown /> : <ChevronRight />}
            </div>

            {selected.title == a.title && (
              <div ref={openAccordionRef} className="absolute lg:ml-[20rem] ml-[14rem] lg:w-[700px] w-[560px]  mt-3 ">
                <div className="h-full">
                  <CustomTabs
                    baseColor={a.color}
                    tabsData={a.tabs}
                    showTabs={a.tabs.length > 1 ? true : false}
                  />
                  <BubbleTip color={a.color} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductDetailAccordion;
