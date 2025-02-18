import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ax from '../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import { IFaq, IFaqCategory } from '@repo/ui/types/faq';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import ListFaq from './ListFaq';

const ListFaqContainer = async (): Promise<JSX.Element> => {
  let data: IFaq[] = [];
  let faqCategories: IFaqCategory[] = [];
  let error: string = '';

  try {
    const res: AxiosResponse<IFaq[]> = await ax({
      method: 'get',
      url: endpoints.faq,
    });
    data = res.data;

    const resCategories: AxiosResponse<IFaqCategory[]> = await ax({
      method: 'get',
      url: endpoints.faqCategory,
    });
    data = res.data;
    faqCategories = resCategories.data;
  } catch (err) {
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
    <Suspense fallback={<Loader text="Loading Product Interest.." />}>
      <ListFaq faqCategories={faqCategories} faq={data} />
    </Suspense>
  );
};

export default ListFaqContainer;
