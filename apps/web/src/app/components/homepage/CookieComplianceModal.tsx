'use client';
import React, { useEffect, useState } from 'react';
import CustomDialog from '../common/CustomDialog';
import { Button } from '../../../ui/components/ui/button';

const CookieComplianceModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('wb_c');
    if (!cookieConsent) {
      setOpen(true); // Open modal if no consent found
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('wb_c', 'true');
    setOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('wb_c', 'false');
    setOpen(false);
  };

  return (
    <CustomDialog
      className="w-[300px] md:w-[500px] rounded-lg"
      Component={
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 font-heyComic text-primary-black">
            Accept Cookies
          </h2>
          <p className="mb-4 font-helveticaRoundedBold">
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking "Accept", you consent to our use of cookies.
            You can manage your preferences in your browser settings.
          </p>
          <div className="flex justify-end font-heyComic">
            <Button
              className="mr-2 px-4 py-2 bg-primary-color text-white rounded-full shadow-md hover:bg-primary-color"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              className="px-4 py-2 bg-tertiary-red text-white rounded-full shadow-md hover:bg-tertiary-color"
              onClick={handleDecline}
            >
              Decline
            </Button>
          </div>
        </div>
      }
      open={open}
    />
  );
};

export default CookieComplianceModal;
