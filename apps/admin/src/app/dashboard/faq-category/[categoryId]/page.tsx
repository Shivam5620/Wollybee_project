import axios, { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import { IFaqCategory } from '@repo/ui/types/faq';
import { Suspense } from 'react';
import Error from './error';
import Loader from '../../../components/common/Loader';
import ListCategoryFaqs from './ListCategoryFaqs';
import ax from '../../../lib/axios';

const ListCategoriesFAQContainer = async ({
  params,
}: {
  params: { categoryId: number };
}): Promise<JSX.Element> => {
  let faqCategory: IFaqCategory | null = null;
  let faqCategories: IFaqCategory[] = [];
  let error: string = '';

  try {
    const resCategories: AxiosResponse<IFaqCategory[]> = await ax({
      method: 'get',
      url: `${endpoints.faqCategory}`,
    });
    const resCategory: AxiosResponse<IFaqCategory> = await ax({
      method: 'get',
      url: `${endpoints.faqCategory}/${params.categoryId}`,
    });
    faqCategory = resCategory.data;
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
    <Suspense fallback={<Loader text="Loading Categoreis FAQ.." />}>
      {faqCategories && faqCategory && (
        <ListCategoryFaqs
          faqCategories={faqCategories}
          title={faqCategory.name}
          faq={faqCategory.faqs}
        />
      )}
    </Suspense>
  );
};

export default ListCategoriesFAQContainer;
