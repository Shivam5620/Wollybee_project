import { IAddress } from '@repo/ui/types/address';

export const validateAddressPayload = (address: IAddress) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  const isPhoneNumberValid = (phoneNumber: string) =>
    phoneNumber.length === 10 && !isNaN(Number(phoneNumber));

  return (
    !!address.city &&
    !!address.state &&
    !!address.postalCode &&
    !!address.country &&
    !!address.fullName &&
    emailRegex.test(address.email) && // Validate email
    isPhoneNumberValid(address.phoneNumber) && // Validate phone number
    !!address.addressLine1 &&
    !!address.addressLine2
  );
};
