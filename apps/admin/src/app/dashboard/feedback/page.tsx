import React, { Suspense } from 'react';
import ListFeedBack from './ListFeedback';
import axios, { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import CustomError from '../../components/common/CustomError';
import Loader from '../../components/common/Loader';
import { FeedbackType } from '@repo/ui/enums/feedback';
import { IFeedback } from '@repo/ui/types/feedback';
import havePermission from '../../lib/withPermission';

const FeedBack = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams['page'] ?? '1';
  const search = searchParams['search'] ?? '';
  const type = searchParams['type'] ?? FeedbackType.ABANDONED_CART;
  const limit = searchParams['limit'] ?? 10;

  let data: IFeedback[] = [];
  let links = {};
  let meta = {};
  let error = null;

  const haveReadFeedbackPermission = await havePermission(
    permissions.feedback.read,
  );
  if (!haveReadFeedbackPermission) {
    return (
      <CustomError text="You do not have permission to read feedback" />
    );
  }

  try {
    const res: AxiosResponse<any> = await ax({
      method: 'get',
      url: endpoints.feedback,
      params: {
        search,
        page,
        type,
        limit,
      },
    });
    data = res.data.items;
    links = res.data.links;
    meta = res.data.meta;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <CustomError text={error} />;
  }

  return (
    <Suspense fallback={<Loader text="Loading.." />}>
      <ListFeedBack meta={meta} links={links} feedbacks={data} />
    </Suspense>
  );
};

export default FeedBack;
