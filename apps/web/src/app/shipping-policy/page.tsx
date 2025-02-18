import { keywords } from '@repo/ui/lib';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | Policies',
  description:
    'Learn about Wollybee shipping policies, delivery times, and tracking information. We strive to provide a seamless shopping experience.',
  keywords: keywords,
};

const ShippingPolicy = async () => {
  return (
    <div className="md:my-16 my-10 md:px-[22%] px-[8%] text-primary-black">
      <h1 className="font-heyComic md:text-6xl text-4xl text-primary-black text-center md:mb-14 mb-8">
        Shipping Policy
      </h1>
      <div className="font-helvetica md:text-xl texl-lg">
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Overview
          </h1>
          <p>
            Our products are available exclusively online. As of now, we do not
            offer any in-store pickup.
          </p>
          <br />
          <p>
            After receiving your order confirmation email, all orders are
            processed within 0 to 7 business days (excluding weekends and
            holidays). You will receive another notification when your order has
            shipped.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Shipping rates
          </h1>
          <p>
            Shipping charges for your order will be calculated and displayed at
            checkout. For All Orders above Rs. 499/- Shipping is Free.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            How do I check the status of my order?
          </h1>
          <p>
            When your order has shipped, you will receive an email notification
            from us which will include a tracking number you can use to check
            its status. Please allow 48 hours for the tracking information to
            become available.
          </p>
          <br />
          <p>
            If you haven’t received your order within 30 days of receiving your
            shipping confirmation email, please contact us
            at sales@wollybee.com with your name and order number, and we will
            look into it for you.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Need help?
          </h1>
          <p>
            Contact us at sales@wollybee.com for questions related to shipping.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
