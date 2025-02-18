import { keywords } from '@repo/ui/lib';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how we protect your personal information. Your privacy is important to us.',
  keywords: keywords,
};

const PrivacyPolicy = async () => {
  return (
    <div className="md:my-16 my-10 md:px-[22%] px-[8%] text-primary-black">
      <h1 className="font-heyComic md:text-6xl text-4xl text-primary-black text-center md:mb-14 mb-8">
        Privacy Policy
      </h1>
      <div className="font-helvetica md:text-xl texl-lg">
        <p>
          Thank you for visiting our web site i.e. www.wollybee.com (the
          “Site”). This privacy policy tells you how we use personal information
          collected at this Site. Please read this privacy policy before using
          the Site or submitting any personal information. By using the Site,
          you are accepting the terms described in this privacy policy. These
          terms may be changed, but any changes will be posted and changes will
          only apply to activities and information on a going forward, not
          retroactive basis. You are encouraged to review the privacy policy
          whenever you visit the Site to make sure that you understand how any
          personal information you provide will be used. We are not responsible
          for the actions and privacy policies of third-party websites.
        </p>
        <br />
        <p>
          By accessing, using, and sharing your personally identifiable
          information via our Site, you are unconditionally accepting this
          privacy policy in full. If you do not agree to the terms in this
          privacy policy, please stop using the website immediately.
        </p>
        <br />
        <p>
          Please note that this privacy policy should be read in conjunction and
          together with the Terms of Use, Return & Refund Policy and Shipping
          Policy applicable to our Site. You are bound by the terms therein for
          use of our Site.
        </p>
      </div>
      <div className=" font-helvetica md:text-xl texl-lg">
        <div className="mt-10">
          <h4 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mb-8">
            Collection of Information
          </h4>
          <div>
            <p>
              When you visit the Site, we automatically collect certain
              information about your device, including but not limited to
              information about your web browser, IP address, time zone, and
              some of the cookies that are installed on your device.
              Additionally, as you browse the Site, we collect information about
              the individual web pages or products that you view, what websites
              or search terms referred you to the Site, and information about
              how you interact with the Site. We refer to this
              automatically-collected information as 
              <span className="font-helveticaRoundedBold">
                “Device Information”
              </span>
              .
            </p>
            <br />
            <p>
              We collect Device Information using the following technologies:
            </p>
            <ul className="list-disc list-outside px-10 my-2">
              <li>
                “Cookies” are data files that are placed on your device or
                computer and often include an anonymous unique identifier.
              </li>
              <li>
                “Log files” track actions occurring on the Site, and collect
                data including your IP address, browser type, Internet service
                provider, referring/exit pages, and date/time stamps.
              </li>
              <li>
                “Web beacons”, “tags”, and “pixels” are electronic files used to
                record information about how you browse the Site.
              </li>
              <li>
                Additionally, when you make a purchase or attempt to make a
                purchase through the Site, we collect certain information from
                you, including your name, billing address, shipping address,
                payment information (including credit card numbers), email
                address, and phone number. We refer to this information as 
                <span className="font-helveticaRoundedBold">
                  “Order Information”
                </span>
                .
              </li>
            </ul>
            <br />
            <p>
              When we talk about 
              <span className="font-helveticaRoundedBold">
                “Personal Information”
              </span>
               in this Privacy Policy, we are talking both about Device
              Information and Order Information.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <div>
            <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
              Your Consent
            </h1>
            <div>
              <p>
                By visiting the Site or by providing the Personal Information,
                you consent to the collection, use, storage, disclosure and
                otherwise processing of the Personal Information on the Site in
                accordance with this privacy policy. If you disclose to us any
                personal information relating to other people, you represent
                that you have the authority to do so and to permit us to use
                such personal information in accordance with this privacy
                policy.
              </p>
              <br />
              <p>
                You, while providing your Personal Information over the Site,
                consent to us (including our other corporate entities,
                affiliates, lending partners, technology partners, marketing
                channels, business partners and other third parties) to contact
                you through SMS, instant messaging apps, call and/or e-mail for
                the purposes specified in this privacy policy.
              </p>
            </div>
          </div>
          <div>
            <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
              How Do We Use Your Personal Information?
            </h1>
            <div>
              <p>
                We collect your Personal Information in order to provide
                services to you, comply with our legal obligations, and to
                improve our products and services. We use the Order Information
                that we collect generally to fulfil any orders placed through
                the Site (including processing your payment information,
                arranging for shipping, and providing you with invoices and/or
                order confirmations).
              </p>
              <br />
              <p>
                Additionally, we use the Personal Information to enhance the
                customer experience; resolve disputes; troubleshoot problems;
                help promote a safe service; collect money; measure consumer
                interest in our products and services; inform you about online
                and offline offers, products, services, and updates; customize
                and enhance your experience; detect and protect us against
                error, fraud and other criminal activity; enforce our terms and
                conditions; and as otherwise described to you at the time of
                collection of information.
              </p>
            </div>
          </div>
          <div>
            <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
              Sharing Your Personal Information
            </h1>
            <div>
              <p>
                We may share your Personal Information with third parties to
                help us use your Personal Information, as described above. We
                may also share Personal Information with our other corporate
                entities and affiliates for purposes of providing products and
                services offered by them.
              </p>
              <br />
              <p>
                Further, we may share the Personal Information with governmental
                agencies or other companies assisting us in fraud prevention or
                investigation, or with any third party as per direction by the
                Court of law. We may do so when:
              </p>
              <ol className="list-decimal list-outside px-10 my-2">
                <li>Permitted or required by law; or,</li>
                <li>
                  Trying to protect against or prevent actual or potential fraud
                  or unauthorized transactions; or,
                </li>
                <li>
                  Investigating fraud which has already taken place. The
                  Personal Information is not provided to these companies for
                  marketing purposes.
                </li>
              </ol>
              <br />
              <p>
                Furthermore, we do not sell, rent or share your personally
                identifiable information to or with third parties in any way
                other than as disclosed in this privacy policy.
              </p>
            </div>
          </div>
          <div>
            <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
              Behavioural Advertising
            </h1>
            <div>
              <p>
                We may use third-party advertising entities to serve ads when
                you visit the Site. These entities may use the Personal
                Information about your visits to this and other websites in
                order to provide advertisements about goods and services of
                interest to you.
              </p>
            </div>
          </div>
          <div>
            <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
              Do Not Track
            </h1>
            <div>
              <p>
                Please note that we do not alter our Site’s data collection and
                use practices when we see a Do Not Track signal from your
                browser.
              </p>
            </div>
          </div>
          <div>
            <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
              Your Rights
            </h1>
            <div>
              <p>
                If you are an Indian resident, you have the right to access
                personal information we hold about you and to ask that your
                personal information be corrected, updated, or deleted. If you
                would like to exercise this right, please contact us through the
                contact information below.
              </p>
              <br />
              <p>
                Additionally, if you are an Indian resident we note that we are
                processing your information in order to fulfil contracts we
                might have with you (for example if you make an order through
                the Site), or otherwise to pursue our legitimate business
                interests listed above. Additionally, please note that your
                information might be transferred outside of India.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <p>
              When you visit the Site or place an order through the Site, we
              will maintain your Personal Information for as long as your
              account is active, your Personal Information is needed to provide
              you services, or as required to fulfil our legal obligations. If
              you wish to delete your account or request that we no longer use
              your information to provide you services contact us at 
              <span className="font-helveticaRoundedBold">
                contact@wollybee.com
              </span>
              . We will respond to your request within reasonable time.
            </p>
            <br />
            <p>We will respond to your request within reasonable time.</p>
            <h1 className="md:text-2xl text-xl font-helveticaRoundedBold text-primary-black mt-12 mb-4">
              Contact Us
            </h1>
            <p>
              For more information about our privacy policy, if you have
              questions, or if you would like to make a complaint, please
              contact us by e-mail at contact@wollybee.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
