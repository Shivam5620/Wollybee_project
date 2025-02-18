import Image from 'next/image';

const CustomError = ({
  text = 'Oops!! Some Error Occured!',
}: {
  text?: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center my-44 gap-6 px-[5%]">
      <div className="">
        <Image
          width={100}
          height={100}
          alt="Error404"
          src={'/backgrounds/error404.svg'}
          className="w-[250px] xs:w-[600px] text-black animate-pulse"
        />
      </div>
      <div className="text-primary-black text-center flex flex-col items-center  md:gap-2">
        <p className="text-primary-gray mb-10 text-xs xs:text-base md:text-lg  font-helveticaRoundedBold ">
          {text},  We apologize for the inconvenience. Our team is already on it !
        </p>
      </div>
    </div>
  );
};

export default CustomError;
