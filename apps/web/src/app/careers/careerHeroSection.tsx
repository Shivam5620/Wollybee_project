import { ICONS } from '@repo/ui/lib';
import Image from 'next/image';

const CareerHeroSection = () => {
  return (
    <>
      <div className="bg-primary-color pt-6 md:pt-0 w-full h-full">
        <div className=" w-full h-full mx-auto px-[5%]  flex md:flex-row flex-col-reverse items-center sm:gap-4  pb-4 ">
          <div className="md:w-[75%] flex flex-col justify-center items-center">
            <video
              src={ICONS.careerHeroAnimation}
              autoPlay
              muted
              loop
              className="sm:w-[80%] md:w-full z-20 md:min-w-[400px]"
            />
            <p className="md:hidden px-[7%] text-white text-center font-heyComic xl:text-3xl lg:text-2xl md:text-[1.2rem] sm:text-lg text-base -mt-7">
              Join Wollybee and be part of something extraordinary! At Wollybee,
              we've cultivated an inspiring workplace and culture where your
              creativity can flourish. As an edutainment studio, we value every
              artist's unique ideas and support their vision in shaping young
              minds through our engaging content and games. Let's create
              unforgettable experiences together!
            </p>
          </div>
          <div className=" md:w-[45%] w-full lg:mr-20 flex flex-col sm:gap-10 gap-4">
            <h1 className="text-secondary-color font-cheri xl:text-7xl lg:text-6xl md:text-4xl sm:text-5xl text-4xl md:text-left text-center xs:mt-8 sm:mt-10">
              {/* <span className="text-nowrap">Create with Us,</span>
              <br className="md:inline hidden" />{' '}
              <span className="text-nowrap">Grow with us</span> */}
              Be a Part of{' '}
              <span className="text-nowrap">Wollybee’s vision.</span>
            </h1>
            <p className="md:block hidden text-white font-heyComic xl:text-3xl lg:text-xl md:text-[1.2rem] sm:text-lg text-base">
              Join Wollybee and be part of something extraordinary! At Wollybee,
              we've cultivated an inspiring workplace and culture where your
              creativity can flourish. As an edutainment studio, we value every
              artist's unique ideas and support their vision in shaping young
              minds through our engaging content and games. Let's create
              unforgettable experiences together!
            </p>
          </div>
        </div>
      </div>
      <Image
        alt="waves"
        width={100}
        height={100}
        src={'backgrounds/productDetailDownWave.svg'}
        className="w-full h-full"
      />
    </>
  );
};

export default CareerHeroSection;
