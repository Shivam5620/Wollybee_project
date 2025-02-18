import Link from 'next/link';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const YoutubeContainer = ({
  className,
  youtubeLink,
}: {
  className: ClassNameValue;
  youtubeLink: string;
}) => {
  return (
    <div className={twMerge(`mt-10`, className)}>
      {youtubeLink ? (
        <div className="relative w-full md:object-cover h-[550px] md:h-[1000px] pb-10">
          <iframe
            className="w-full h-full rounded-xl"
            src={`${youtubeLink}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="absolute top-[65%] md:top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
            <Link
              href="https://www.youtube.com/@wollybee?sub_confirmation=1"
              target="_blank"
              className="uppercase text-white md:text-3xl bg-[#ff0000] md:px-9 md:py-6 px-4 py-4 rounded-full font-heyComic shadow-xl cursor-pointer transition-transform transform hover:scale-110" // Added scaling and transition classes
            >
              <span>Subscribe Now</span>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default YoutubeContainer;
