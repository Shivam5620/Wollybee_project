'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Image from 'next/image';
import { IFile } from '@repo/ui/types/file';
import { useState } from 'react';

const ProductImagesViewV2 = ({ images }: { images: IFile[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="w-full max-w-[500px] overflow-hidden mx-auto hidden md:block">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {images.map((a) => (
          <SwiperSlide>
            <Image
              alt="image"
              className="w-[480px] h-[480px] rounded-md flex mx-auto"
              src={a.url}
              width={450}
              height={450}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mt-3"
      >
        {images.map((a) => (
          <SwiperSlide>
            <Image
              alt="image"
              className="w-[150px] h-[150px]"
              src={a.url}
              width={100}
              height={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImagesViewV2;
