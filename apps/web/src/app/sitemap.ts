import { endpoints, navBarRoutesClient, routes } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { MetadataRoute } from 'next';
import ax from './lib/axios';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fetch all products and generate sitemaps.
  const productsResponse: AxiosResponse<IProduct[]> = await ax({
    method: 'get',
    url: `${endpoints.product}`,
  });

  const products: IProduct[] = productsResponse.data ?? [];

  // generate sitemaps
  const productsSiteMap = products.map((product) => {
    return {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.productDetail}/${product.id}`,
      changefreq: 'yearly',
      priority: 0.7,
    };
  });

  return [
    ...productsSiteMap,
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.shopAll}`,
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.shopByAge}`,
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.shopByInterest}`,
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.comboAndGifts}`,
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.ourStory}`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.faq}`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.careers}`,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.contactUs}`,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${navBarRoutesClient.whyWollybee}`,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.privacyPolicy}`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.returnPolicy}`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.shippingPolicy}`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.termsAndConditions}`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
