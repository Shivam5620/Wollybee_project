const ProductMoreWaysToPlay = ({
  url,
  description,
}: {
  url: string;
  description: string;
}) => {
  return (
    <div className="w-full flex justify-center md:px-0 pb-10 px-[5%]">
      <div className="mx-2 sm:mx-24 mb-20">
        <div className="text-center md:p-2 py-1 md:mt-2 mt-3">
          <p className={`font-cheri text-3xl md:text-6xl text-white`}>
            more ways to play
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-10 items-center md:items-start mt-5 md:mt-14">
          <p className="font-helveticaRoundedBold whitespace-pre-line text-white md:w-[50%] xl:text-2xl text-lg">
            {description}
          </p>

          <div className="max-w-[350px] md:max-w-[500px] max-h-[300px]">
            {url && (
              <iframe
                className="rounded-xl"
                width="300"
                height="300"
                src={`https://www.youtube.com/embed/${url}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMoreWaysToPlay;
