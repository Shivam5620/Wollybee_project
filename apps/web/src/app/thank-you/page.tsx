import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { endpoints, ICONS } from '@repo/ui/lib';
import axios, { AxiosResponse } from 'axios';
import { IOrder } from '@repo/ui/types/order';
import ax from '../lib/axios';
import CustomError from '../components/common/CustomError';
import { OrderPaymentMode } from '@repo/ui/enums/order';
import ThankyouPageSkeleton from '../components/skeleton/ThankyouPageSkeleton';

const ThankYouPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let data: IOrder | null = null;
  const id = searchParams['id'] ?? '1';
  let error: string = '';
  try {
    const res: AxiosResponse<any> = await ax({
      method: 'get',
      url: `${endpoints.order}/${id}`,
    });
    data = res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return (
      <CustomError text="Some Error Occured while fetching your order.." />
    );
  }

  if (!data) {
    return null;
  }

  const date = new Date(data?.createdAt ?? Date.now());
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Suspense fallback={<ThankyouPageSkeleton />}>
      <div className="max-w-[1440px] px-[5%] mx-auto">
        <h1 className="text-primary-color mt-16 mb-5 font-heyComic lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center">
          Woohoo ! Wollybee Fun on the Way !
        </h1>
        <p className="text-center text-primary-black font-heyComic md:text-2xl text-base md:w-[70%] mx-auto">
          We’re thrilled to bring a touch of wollybee magic to your home{' '}
          <span className="md:hidden inline">!</span>
          <span className="md:inline hidden">
            to spark your child’s imagination and learning journey !
          </span>
        </p>
        <div className="md:px-[10%] p-0">
          <div className="rounded-3xl md:p-14 py-2 pb-20 px-3 md:my-20 mt-14 mb-10 shadow-[0px_1px_15px_0px_#e3e3e3]">
            <p className="text-center md:mb-20 mt-8 mb-10 text-primary-black font-heyComic xl:text-3xl md:text-2xl text-base mx-auto">
              Thank you for shopping with us. We will be processing your order
              soon.
            </p>
            <div className="bg-[#f2f2f2] rounded-3xl md:py-12 py-8 md:px-8 px-6 ">
              <h1 className="md:text-3xl text-lg font-helveticaRoundedBold md:mb-12 mb-4">
                Order Summary
              </h1>
              <div className="flex lg:flex-row flex-col justify-between">
                <div className="flex flex-col md:gap-5 gap-1">
                  <p className="font-helvetica xl:text-2xl md:text-lg text-base">
                    Order ID :
                  </p>
                  <p className="font-helveticaRoundedBold xl:text-2xl md:text-lg text-base">
                    {data.orderId}
                  </p>
                </div>
                <div className="lg:border-r-2 lg:w-0 w-full border-b-2 border-dashed border-[#bdbdbd] lg:my-0 mb-4 mt-[6px] "></div>
                <div className="flex flex-col md:gap-5 gap-1">
                  <p className="font-helvetica xl:text-2xl md:text-lg text-base">
                    Date:
                  </p>
                  <p className="font-helveticaRoundedBold xl:text-2xl md:text-lg text-base">
                    {formatter.format(date)}
                  </p>
                </div>
                <div className="lg:border-r-2 lg:w-0 w-full border-b-2 border-dashed border-[#bdbdbd] lg:my-0 mb-4 mt-[6px] "></div>
                <div className="flex flex-col md:gap-5 gap-1">
                  <p className="font-helvetica xl:text-2xl md:text-lg text-base">
                    Total:
                  </p>
                  <p className="font-helveticaRoundedBold xl:text-2xl md:text-lg text-base">
                    Rs. {data.totalAmount}
                  </p>
                </div>
                <div className="lg:border-r-2 lg:w-0 w-full border-b-2 border-dashed border-[#bdbdbd] lg:my-0 mb-4 mt-[6px] "></div>
                <div className="flex flex-col md:gap-5 gap-1">
                  <p className="font-helvetica xl:text-2xl md:text-lg text-base">
                    Payment method:
                  </p>
                  <p className="font-helveticaRoundedBold xl:text-2xl md:text-lg text-base">
                    {data.paymentMode == OrderPaymentMode.CASH_ON_DELIVERY
                      ? 'Cash on Delivery'
                      : 'Online'}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:mt-14 mt-6">
              <div className="bg-[#f2f2f2] rounded-3xl md:p-8 px-4 py-8">
                <h1 className="md:text-3xl text-lg font-helveticaRoundedBold md:mb-12 mb-4">
                  Order Details
                </h1>
                <div>
                  <table className="w-full md:text-xl text-base">
                    <thead className="border-b-2 border-dashed border-[#bdbdbd]">
                      <tr>
                        <th className="md:text-3xl text:lg font-normal font-helveticaRoundedBold text-left pb-4">
                          Product/s
                        </th>
                        <th className="md:text-3xl text:lg font-normal font-helveticaRoundedBold pb-4 text-end">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-heyComic">
                      {data.items.map((a) => (
                        <tr className="border-b-2 border-dashed py-2 border-[#bdbdbd] ">
                          <td className="py-3">
                            {a?.product?.name} x {a.quantity}
                          </td>
                          <td className="py-3 text-end">Rs.{a.price}</td>
                        </tr>
                      ))}

                      <tr>
                        <td className="py-2">Subtotal:</td>
                        <td className="py-2 text-end">Rs.{data.totalAmount}</td>
                      </tr>
                      <tr>
                        <td className="pb-2">Discount:</td>
                        <td className="pb-2 text-end">-Rs.{data.discount}</td>
                      </tr>
                      <tr>
                        <td className="pb-2">Shipping:</td>
                        <td className="pb-2 text-end">
                          {data.shippingCharges}
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2">COD fee</td>
                        <td className="pb-2 text-end">{data.codCharges}</td>
                      </tr>
                      <tr>
                        <td className="pb-2 font-helveticaRoundedBold">
                          Total:
                        </td>
                        <td className="pb-2 text-end">
                          Rs.{data.discountedAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="uppercase font-helveticaRoundedBold text-center mb-4 md:mb-10 md:text-2xl">
              Join our Active Community
            </p>
            <div className="flex sm:flex-row flex-col md:gap-10 gap-4 justify-center items-center mb-10">
              <Link
                href={'https://youtube.com/@wollybee'}
                className="shadow-[0px_0px_10px_0px_#00000024] xs:w-auto w-[80%] flex items-center justify-center gap-4 md:text-lg sm:text-base text-sm rounded-full px-7 xs:py-4 py-2.5 font-helveticaRoundedBold hover:text-white hover:bg-primary-color hover:border-primary-color transition-all"
              >
                <Image
                  width={50}
                  height={50}
                  alt="Youtube"
                  src={ICONS.youtubeIcon}
                  className="w-[30px] h-[30px]"
                />
                <p>
                  <span className="hidden xs:inline-block">Subscribe on</span>{' '}
                  YouTube
                </p>
              </Link>
              <Link
                href={'https://wa.me/message/HXEPNOJ5LJWIF1'}
                className="shadow-[0px_0px_10px_0px_#00000024] xs:w-auto w-[80%] flex items-center justify-center gap-2 md:text-lg sm:text-base text-sm  rounded-full  px-7 xs:py-3 py-1.5 font-helveticaRoundedBold hover:text-white hover:bg-primary-color hover:border-primary-color transition-all "
              >
                <Image
                  width={50}
                  height={50}
                  alt="Youtube"
                  src={ICONS.whatsappIcon}
                  className="w-[40px]"
                />
                <p>
                  <span className="hidden xs:inline-block">
                    Stay Updated on{' '}
                  </span>{' '}
                  Whatsapp
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ThankYouPage;
