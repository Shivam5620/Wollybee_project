import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ax from '../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import { IFaqCategory } from '@repo/ui/types/faq';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import ListFaqCategory from './ListFaqCategory';
import { IFile } from '@repo/ui/types/file';

const ListFaqContainer = async (): Promise<JSX.Element> => {
  let faqCategories: IFaqCategory[] = [];
  let error: string = '';
  let data: IFile[] = [];
  try {
    const resCategories: AxiosResponse<IFaqCategory[]> = await ax({
      method: 'get',
      url: endpoints.faqCategory,
    });
    const resData: AxiosResponse<IFile[]> = await ax({
      method: 'get',
      url: `${endpoints.file}`,
    });

    data = resData.data;
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
    <Suspense fallback={<Loader text="Loading FAQ Categories.." />}>
      <ListFaqCategory faqCategories={faqCategories} images={data} />
    </Suspense>
  );
};

export default ListFaqContainer;
