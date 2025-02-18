
import React, { Suspense } from 'react'
import ListReviews from './ListProductReview'
import { ProductReviewStatus } from '@repo/ui/enums/productReview';
import axios, { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { IProductReview } from '@repo/ui/types';
import { endpoints, permissions } from '@repo/ui/lib';
import CustomError from '../../components/common/CustomError';
import Loader from '../../components/common/Loader';
import havePermission from '../../lib/withPermission';

const Reviews = async ({
  searchParams}
: { searchParams : { [key : string] : string | string[] | undefined } }  ) => {

  const page = searchParams['page'] ?? '1';
  const search = searchParams['search'] ?? '';
  const rating = searchParams['rating'] ?? 1;
  const status = searchParams['status'] ?? ProductReviewStatus.APPROVAL_PENDING;
  const limit = searchParams['limit'] ?? 10;

  const haveReadProductReviewPermission = await havePermission(
    permissions.productReview.read,
  )

  if(!haveReadProductReviewPermission){ 
    return <CustomError text="You do not have permission to read reviews" />
  }
  
  let data:IProductReview[] = [];
  let links = {};
  let meta = {};
  let error = null;
  try {
    const res: AxiosResponse<any> = await ax({
      method: 'get',
      url: endpoints.productReview,
      params: {
        search,
        page,
        rating,
        status,
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

  if(error){
    return <CustomError text={error} />
  }

  return (
    <Suspense fallback={<Loader text='Loading..' />}>
   <ListReviews meta={meta} links={links} reviews={data} />
   </Suspense>
  )
}

export default Reviews