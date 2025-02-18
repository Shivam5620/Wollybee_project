import { ClassNameValue, twMerge } from 'tailwind-merge';
import { endpoints } from '../../../../../packages/ui/lib/constants';
import { IFaqCategory } from '@repo/ui/types/faq';
import axios, { AxiosResponse } from 'axios';
import ax from '../lib/axios';
import Error from '../faq/error';
import { Suspense } from 'react';
import { OurStoryFaq } from './OurStoryFAQ';

export const OurStoryFaqWrapper = async ({
  className,
}: {
  className: ClassNameValue;
}): Promise<JSX.Element> => {
  let faqCategories: IFaqCategory[] = [];
  let error: string = '';

  try {
    const resCategories: AxiosResponse<IFaqCategory[]> = await ax({
      method: 'get',
      url: endpoints.faqCategory,
    });
    faqCategories = resCategories.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error = error.response?.data?.message || error.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  console.log('Categories: ', faqCategories);

  if (error) {
    return <Error />;
  }

  return (
    <Suspense fallback={'Loading'}>
      <OurStoryFaq faqData={faqCategories} className={className} />;
    </Suspense>
  );
};
