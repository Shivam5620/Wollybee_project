import React from 'react';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import MultipleImageCard from '../components/common/MultipleImageCard';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Wollybee Today',
  description:
    'Have questions or need support? Reach out to [Your Company] via our contact form, phone, or email. Our team is here to assist you with inquiries, feedback, and more. Contact us today and we will be happy to help!',
  keywords: [
    'Contact Us',
    'Get in Touch',
    'Customer Support',
    'Contact [Your Company]',
    'Reach Out',
    'Customer Service',
    'Support Team',
    'Inquiries',
    'Contact Form',
    'Company Contact Information',
    'Email Us',
    'Call Us',
    'Feedback',
    'Help Center',
    'Request Support',
  ],
};

const ContactUsPage = () => {
  return (
    <div className=" ">
      <div className="w-full h-full bg-primary-color">
        <div className="max-w-[1440px] mx-auto px-[5%] sm:px-0 flex md:flex-row flex-col md:items-top gap-8 md:pt-14 pt-4 md:pb-10 pb-8">
          <div className="md:w-[75%] flex-1 flex justify-center items-center">
            <Image
              src={ICONS.contactHeroAnimation}
              width={200}
              height={200}
              alt="contactAnimation"
              className="sm:w-[80%] md:w-full w-full z-20"
            />
          </div>
          <div className="md:w-[45%] flex-1 flex flex-col gap-10">
            <p className="text-white font-helveticaRoundedBold xl:text-3xl lg:text-2xl md:text-[1.2rem] sm:text-lg text-base text-center md:text-left px-[7%]">
              Wollybee is built out of love & passion towards teaching kids and
              enriching their growth journey. We’d love to hear from those who
              carry the same values and passion that we do. 
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

      <MultipleImageCard
        imageStyling="p-[14px]"
        label="Below are some examples of how we carry out partnerships."
        showBgColor={false}
        data={[
          {
            text: 'Brand Collaboration',
            color: 'tertiary-red',
            image: ICONS.contactUs.brandCollaboration,
          },
          {
            text: 'Kids Events',
            color: 'secondary-color',
            image: ICONS.contactUs.kidsEvent,
          },
          {
            text: 'Workshops',
            color: 'tertiary-green',
            image: ICONS.contactUs.workshops,
          },
        ]}
      />

      <div className="text-center font-heyComic md:text-3xl sm:text-2xl text-xl px-[10%] flex justify-center md:mt-32 mt-10 mb-20">
        <p className="lg:w-[60%]">
          If you don’t fall under any of these categories, we’d still like to
          hear from you. Write to us at – <br />
          <a className="text-primary-color" href="mailto:contact@wollybee.com">
            contact@wollybee.com
          </a>{' '}
        </p>
      </div>
    </div>
  );
};

export default ContactUsPage;
