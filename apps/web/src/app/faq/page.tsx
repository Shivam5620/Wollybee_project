import axios, { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import { IFaqCategory } from '@repo/ui/types/faq';
import { Suspense } from 'react';
import ax from '../lib/axios';
import Error from './error';
import FAQ from './FaqContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions on our FAQ page. From product details to account management, our comprehensive guide helps you quickly resolve issues and get the information you need. Browse our FAQs or contact us for further assistance.',
  keywords: [
    'FAQ',
    'Frequently Asked Questions',
    'Help Center',
    'Support Questions',
    'Customer Support',
    'Product FAQs',
    'Account Help',
    'Common Queries',
    'Troubleshooting',
    'Help Guide',
    'Contact Support',
    'Information',
    'Help Resources',
  ],
};
import { logError } from '../../utils/helper';
import FAQSkeleton from '../components/skeleton/FAQSkeleton';

const ListFaqContainer = async (): Promise<JSX.Element> => {
  let faqCategories: IFaqCategory[] = [];
  let error: string = '';

  try {
    const resCategories: AxiosResponse<IFaqCategory[]> = await ax({
      method: 'get',
      url: endpoints.faqCategory,
    });
    faqCategories = resCategories.data;
  } catch (err) {
    logError(JSON.stringify(err), 'ListFAQContainer');
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <Error />;
  }

  return (
    <Suspense fallback={<FAQSkeleton />}>
      <FAQ categories={faqCategories} />
    </Suspense>
  );
};

export default ListFaqContainer;
