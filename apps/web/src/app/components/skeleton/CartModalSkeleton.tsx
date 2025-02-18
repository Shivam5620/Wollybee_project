import Image from 'next/image';
import Sandwich from '../common/Sandwich';
import { Skeleton } from './Skeleton';
import { ICONS } from '@repo/ui/lib';

const UserDetailFooterSkeleton = () => {
  return (
    <div className="bg-white shadow-lg p-3">
      <Skeleton className="text-2xl h-[56px] flex gap-3 bg-secondary-color hover:bg-primary-color text-white rounded-full font-heyComic w-full" />

      <div className="text-[10px] mt-2 font-helvetica text-center text-gray-600">
        <p>By proceeding, I accept that I have read and</p>
        <p>understood Wollybee’s Privacy Policy and T&C.</p>
      </div>
    </div>
  );
};

const UserDetailHeaderSkeleton = () => {
  return (
    <>
      <div className="flex gap-2 mx-4 my-3">
        <Image
          className="hidden md:block cursor-pointer mr-2"
          src={ICONS.backIcon}
          alt="back"
          width={16}
          height={16}
        />
        <Image
          className="md:hidden"
          src={ICONS.backIcon}
          alt="back"
          width={16}
          height={16}
        />
        <Image
          src={ICONS.wollybeeCheckoutLogo}
          alt="wollybee checkout"
          width={120}
          height={30}
        />
      </div>
      <div className="flex gap-8 pb-3 px-2 text-lg font-heyComic justify-center text-primary-black shadow-md">
        <p className={`cursor-pointer`}>Address</p>

        <p className={`cursor-pointer`}>Pay</p>
      </div>
    </>
  );
};

export const CartContentSkeleton = () => {
  return (
    <>
      <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
      <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
      <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
      <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
    </>
  );
};

const CartModalSkeleton = () => {
  return (
    <>
      <div className="h-full flex">
        <div className="h-full w-full md:w-[60%] justify-center">
          <Sandwich
            content={
              <>
                <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
                <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
                <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
                <Skeleton className="w-[90%] h-14 ml-5 justify-center flex my-4 rounded-full" />
              </>
            }
            footer={<UserDetailFooterSkeleton />}
            header={<UserDetailHeaderSkeleton />}
          />
        </div>
        <div className="hidden md:block h-full w-[40%] p-3 rounded-md justify-center">
          <Skeleton className="w-[90%] h-72 justify-center flex my-4 rounded-lg" />
          <Skeleton className="w-[90%] h-16 justify-center flex my-4 rounded-full" />
        </div>
      </div>
    </>
  );
};

export default CartModalSkeleton;
