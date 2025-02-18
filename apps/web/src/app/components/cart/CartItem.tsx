import { ICONS } from '@repo/ui/lib';
import { ICartItemClient } from '@repo/ui/types';
import Image from 'next/image';
import { addCartItem, deleteCartItem } from './cart.action';
import { useSession } from 'next-auth/react';
import { toast } from '../../../ui/components/ui/use-toast';
import { useAppDispatch } from '../../../lib/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setLoading,
} from '@repo/ui/lib/features/cartSlice';
import { CartAction } from '@repo/ui/enums/cart';

const CartItem = ({ data }: { data: ICartItemClient }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const handleDeleteCartItem = async () => {
    if (session?.user?.id) {
      dispatch(setLoading(true));
      const res = await deleteCartItem(data.id);
      dispatch(setLoading(false));
      if ('success' in res) {
        dispatch(removeFromCart(data));
      }
      if ('error' in res) {
        toast({ title: res.error.message, variant: 'destructive' });
      }
    } else {
      dispatch(removeFromCart(data));
      toast({ title: 'Removed from Basket!' });
    }
  };

  const handleIncreaseQuantity = async () => {
    if (session?.user?.id) {
      dispatch(setLoading(true));
      const res = await addCartItem({
        productId: data.id,
        quantity: 1,
        action: CartAction.ADD,
      });
      if ('success' in res) {
        dispatch(increaseQuantity(data));
      }
      dispatch(setLoading(false));
    } else {
      dispatch(increaseQuantity(data));
    }
  };

  const handleDecreaseQuantity = async () => {
    if (session?.user?.id) {
      dispatch(setLoading(true));
      if (data.quantity == 1) {
        await handleDeleteCartItem();
      } else {
        const res = await addCartItem({
          productId: data.id,
          quantity: 1,
          action: CartAction.REMOVE,
        });
        if ('success' in res) {
          dispatch(decreaseQuantity(data));
        }
      }
      dispatch(setLoading(false));
    } else {
      dispatch(decreaseQuantity(data));
    }
  };

  return (
    <div className="items-center py-3 px-2 rounded-md mx-2 my-1 flex justify-between border-[1px] border-gray-light-bg">
      <div className="px-2">
        <Image
          src={data?.images?.[0].url}
          alt="image"
          className="max-w-[90px] max-h-[90px] overflow-hidden"
          width={90}
          height={90}
        />
      </div>
      <div className="font-heyComic text-primary-black">
        <p className="text-[13px] mb-1.5 ">
          {data.name.length > 20
            ? `${data.name.substring(0, 20)}...`
            : data.name}
        </p>

        <div className="flex gap-2 items-center">
          <Image
            className="cursor-pointer"
            src={ICONS.decreaseCountIcon}
            alt="share"
            onClick={handleDecreaseQuantity}
            width={20}
            height={20}
          />
          <p className="text-md">{data.quantity}</p>
          <Image
            className="cursor-pointer"
            src={ICONS.increaseCountIcon}
            alt="share"
            onClick={handleIncreaseQuantity}
            width={20}
            height={20}
          />

          <div className="ml-2 text-xs flex gap-2 font-heyComic">
            <p>Rs. {data.discountedPrice}</p>
            <p className="line-through text-tertiary-red">Rs. {data.price}</p>
          </div>
        </div>
      </div>

      <div>
        <Image
          alt="close"
          onClick={handleDeleteCartItem}
          className="cursor-pointer opacity-65"
          src={ICONS.closeIcon}
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default CartItem;
