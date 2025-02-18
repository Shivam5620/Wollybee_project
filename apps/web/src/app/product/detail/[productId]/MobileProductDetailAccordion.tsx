'use client';
import { IProduct } from '@repo/ui/types';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../../ui/components/ui/accordion';
import CustomTabs from './CustomTabs';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

function MobileProductDetailAccordion({ product }: { product: IProduct }) {

 const [selected, setSelected] = useState(product.additionalInfo?.[0] ?? {
    title: '',
    color: '',
    tabs: [],
  });

  return (
    <div className="md:hidden">
      <Accordion type="single" defaultValue="0" collapsible>
        {product.additionalInfo?.map((a, index) => (
          <AccordionItem
            key={a.title}
            value={index.toString()}
            className="my-2 mx-4"
          >
            <div
              style={{
                backgroundColor: selected.title === a.title ? a.color : 'white',
                borderRadius: '20px',
              }}
              onClick={() => {
                setSelected(a);
              }}
              className="shadow-none overflow-hidden"
            >
              <AccordionTrigger
                style={{
                  borderWidth: '2px',
                  borderColor: a.color,
                  color: selected.title === a.title ? 'white' : a.color,
                }}
                onClick={() => {
                  setSelected(a);
                }}
                className={` font-heyComic rounded-[20px] shadow-md xs:py-3 py-1  flex gap-4 w-full justify-between px-10`}
              >
                <p>{a.title}</p>
                {selected.title == a.title ? <ChevronDown /> : <ChevronRight />}
              </AccordionTrigger>
              <AccordionContent className="mx-2">
                <CustomTabs
                  baseColor={a.color}
                  tabsData={a.tabs}
                  showTabs={a.tabs.length > 1 ? true : false}
                />
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default MobileProductDetailAccordion;
