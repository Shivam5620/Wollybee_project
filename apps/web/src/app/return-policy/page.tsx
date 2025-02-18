import { keywords } from '@repo/ui/lib';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Return & Refund Policy',
  description:
    'Understand our return and refund policies. We want you to be completely satisfied with your purchase.',
  keywords: keywords,
};

const ReturnPolicy = async () => {
  return (
    <div className="md:my-16 my-10 md:px-[22%] px-[8%] text-primary-black">
      <h1 className="font-heyComic md:text-6xl text-4xl text-primary-black text-center md:mb-14 mb-8">
        Returns & Refund Policy
      </h1>
      <div className="font-helvetica md:text-xl texl-lg">
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Overview
          </h1>
          <p>
            Our returns and refund policy lasts 7 days. If 7 days have passed
            since your purchase, we can’t offer you a refund or exchange. To be
            eligible for a return, your item must be unused and in the same
            condition that you received it, with tags, and in its original
            packaging. You’ll also need the receipt or proof of purchase. To
            start a return, you can contact us at sales@wollybee.com If your
            return is accepted, we’ll send you instructions on how and where to
            send your package. Items sent back to us without first requesting a
            return will not be accepted.
          </p>
          <br />
          <p>You can always contact us for questions at sales@wollybee.com</p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Damages and issues
          </h1>
          <p>
            Please inspect your order upon reception and contact us immediately
            if the item is defective, damaged or if you receive the wrong item,
            so that we can evaluate the issue and make it right.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Exceptions / non-returnable items
          </h1>
          <p>
            Certain types of items cannot be returned, like perishable goods
            (such as food), custom products (such as special orders or
            personalised items). We also do not accept returns for hazardous
            materials, flammable liquids, or gases. Please get in touch if you
            have questions or concerns about your specific item.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Refunds
          </h1>
          <p>
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund. If
            you are approved, then your refund will be processed, and a credit
            will automatically be applied to your credit card or original method
            of payment, within 10 business days.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Late or missing refunds
          </h1>
          <p>
            If you haven’t received a refund yet, first check your bank account
            again. Then contact your credit card company, it may take some time
            before your refund is officially posted. Next contact your bank.
            There is often some processing time before a refund is posted. If
            you’ve done all of this and you still have not received your refund
            yet, please contact us at sales@wollybee.com
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Sale items
          </h1>
          <p>
            Only regular priced items may be refunded. Sale items cannot be
            refunded.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Exchanges
          </h1>
          <p>
            The fastest way to ensure you get what you want is to return the
            item you have, and once the return is accepted, make a separate
            purchase for the new item. We only replace items if they are
            defective or damaged. If you want to exchange it for another
            item, once the return is accepted, make a separate purchase for the
            new item.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Shipping returns
          </h1>
          <p>
            To return your product, you should mail your product to: 1st Floor,
            Plot No. 73, Scheme No. 103, Kesar Bagh Road, Lokmanya Nagar,
            Indore, Madhya Pradesh, India 452009 You will be responsible for
            paying for your own shipping costs for returning your item. Shipping
            costs are non-refundable. If you receive a refund, the cost of
            return shipping will be deducted from your refund. Depending on
            where you live, the time it may take for your exchanged product to
            reach you may vary. If you are returning more expensive items, you
            may consider using a trackable shipping service or purchasing
            shipping insurance. We don’t guarantee that we will receive your
            returned item.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
            Need help?
          </h1>
          <p>
            Contact us at sales@wollybee.com for questions related to refunds
            and returns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
