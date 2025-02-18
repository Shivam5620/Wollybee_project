import { AddressType } from '../enums/address';

export interface IAddress {
  id?: number;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  additionalInstructions?: string;
  isDefault: boolean;
  email: string;
  type: AddressType;
}
