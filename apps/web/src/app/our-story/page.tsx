import axios, { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import { IFaqCategory } from '@repo/ui/types/faq';
import ax from '../lib/axios';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Wollybee',
  description:
    'Wollybee envisions a future where every child unlocks their potential through joyful learning adventures.',
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
import OurStoryPage from './OurStory';
import CustomError from '../components/common/CustomError';

const OurStoryContainer = async (): Promise<JSX.Element> => {
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
    return <CustomError text="Some error occured while fetching Faqs" />;
  }

  return <OurStoryPage categories={faqCategories} />;
};

export default OurStoryContainer;
