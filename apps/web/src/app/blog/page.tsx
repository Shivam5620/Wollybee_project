'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CustomPagination from '../components/common/CustomPagination';
import { MultipleItemsCarousel } from '../components/common/CustomCarousel';
import MobileProductCard from '../components/product/MobileProductCard';
import { ICONS } from '@repo/ui/lib';

interface IBlogItem {
  id: number;
  title: string;
  content: string;
  image: string;
}

const BlogDataItem = ({ image, id, title, content }: IBlogItem) => {
  return (
    <div key={id} className="sm:col-span-4  sm:w-full ">
      <Image
        alt="blog-image"
        width={200}
        height={200}
        src={image}
        className="w-full  aspect-square mb-8 rounded-2xl"
      />
      <Link
        href={`/blog/${id}`}
        className="block font-heyComic mb-3 sm:text-2xl text-xl cursor-pointer"
      >
        {title}
      </Link>
      <p className="font-helvetica sm:text-base text-sm  mb-6">{content}</p>
      <Link className="font-heyComic" href={`/blog/${id}`}>
        READ MORE
      </Link>
    </div>
  );
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState<IBlogItem[]>([]);

  return (
    <div className="mx-auto max-w-[1440px]  overflow-x-hidden">
      <div className="sm:px-0 px-[5%]">
        <h1 className="font-heyComic md:text-6xl text-4xl text-primary-black text-center md:mb-20 mb-14 mt-14">
          Blog Niche Heading
        </h1>
        <div className="grid sm:grid-cols-12 grid-cols-1 gap-0">
          <div className="col-span-9 grid sm:grid-cols-9 grid-cols-1 gap-20 auto-rows-min">
            {blogs.map((blog) => (
              <BlogDataItem
                key={blog.id}
                image={blog.image}
                id={blog.id}
                title={blog.title}
                content={blog.content}
              />
            ))}
          </div>
          <div className="col-span-3 lg:flex hidden flex-col items-center gap-20">
            <Image
              src={ICONS.blogDealOfTheDay1}
              alt="deal of the day"
              width={300}
              height={300}
            />

            <div className="mt-24 max-w-[800px] rotate-90">
              <MultipleItemsCarousel
                Component={(item) => {
                  return (
                    <div className="-rotate-90">
                      <MobileProductCard product={item} />
                    </div>
                  );
                }}
                data={[]}
                carouselId="blog-carousel-vertical"
                arrows={{
                  left: ICONS.carouselArrows.grayThinTop,
                  right: ICONS.carouselArrows.grayThinBottom,
                }}
                defaultSlidesPerView={3}
              />
            </div>

            <Image
              src={ICONS.blogDealOfTheDay2}
              alt="deal of the day"
              width={300}
              height={300}
            />
          </div>
        </div>
        {/* <CustomPagination
          items={blogData}
          itemsPerPage={4}
          onChangePage={(blogs: IBlogItem[]) => setBlogs(blogs)}
          defaultPage={1}
        /> */}
      </div>
    </div>
  );
};

export default BlogPage;
