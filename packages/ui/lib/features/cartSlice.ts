import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IBanner,
  ICartItemClient,
  ICartItemResponse,
  IProduct,
} from '../../types';
import { IAddress } from '../../types/address';
import { ICouponResponse } from '../../types/coupon';
import { AddressType } from '../../enums/address';
import { OrderPaymentMode } from '../../enums/order';

interface CouponResponse {
  totalAmount: number;
  discount: number;
  discountedAmount: number;
  coupon: string;
}

interface IShippingConfiguration {
  shippingCharges: number;
  freeShippingCartValue: number;
}

export interface CartState extends CouponResponse {
  paymentMode: OrderPaymentMode;
  cartItems: ICartItemResponse[];
  coupons: ICouponResponse[];
  couponsModalOpen: boolean;
  banners: IBanner[];
  products: IProduct[];
  myAddresses: IAddress[];
  shippingConfiguration: IShippingConfiguration;
  isCouponApplied: boolean;
  showCartDrawer: boolean;
  showCheckoutModal: boolean;
  showFeedbackModal: boolean;
  showAddAddress: boolean;
  showEditAddress: boolean;
  showPaymentView: boolean;
  selectedAddress: IAddress;
  loading: boolean;
}

const initialState: CartState = {
  paymentMode: OrderPaymentMode.ONLINE,
  cartItems: [],
  coupons: [],
  banners: [],
  products: [],
  myAddresses: [],
  totalAmount: 0,
  discount: 0,
  discountedAmount: 0,
  isCouponApplied: false,
  shippingConfiguration: {
    shippingCharges: 0,
    freeShippingCartValue: 499,
  },
  coupon: '',
  couponsModalOpen: false,
  showCartDrawer: false,
  showCheckoutModal: false,
  showFeedbackModal: false,
  showAddAddress: false,
  showEditAddress: false,
  showPaymentView: false,
  selectedAddress: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    fullName: '',
    phoneNumber: '',
    postalCode: '',
    type: AddressType.HOME,
    email: '',
    isDefault: false,
  },
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCouponsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.couponsModalOpen = action.payload;
    },
    setPaymentMode: (state, action: PayloadAction<OrderPaymentMode>) => {
      state.paymentMode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCartCoupons: (state, action: PayloadAction<ICouponResponse[]>) => {
      state.coupons = action.payload;
    },
    setCartBanners: (state, action: PayloadAction<IBanner[]>) => {
      state.banners = action.payload;
    },
    setCartProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setCartMyAddresses: (state, action: PayloadAction<IAddress[]>) => {
      state.myAddresses = action.payload;
    },
    setAddAddressView: (state, action: PayloadAction<boolean>) => {
      state.showAddAddress = action.payload;
    },
    setShowCartDrawer: (state, action: PayloadAction<boolean>) => {
      state.showCartDrawer = action.payload;
    },
    setShowCartCheckoutModal: (state, action: PayloadAction<boolean>) => {
      state.showCheckoutModal = action.payload;
    },
    setShowCartFeedbackModal: (state, action: PayloadAction<boolean>) => {
      state.showFeedbackModal = action.payload;
    },
    setSelectedAddress: (state, action: PayloadAction<IAddress>) => {
      state.selectedAddress = action.payload;
    },
    setEditAddressView: (state, action: PayloadAction<boolean>) => {
      state.showEditAddress = action.payload;
    },
    setShowPaymentView: (state, action: PayloadAction<boolean>) => {
      state.showPaymentView = action.payload;
    },
    setShippingConfiguration: (
      state,
      action: PayloadAction<IShippingConfiguration>,
    ) => {
      state.shippingConfiguration = action.payload;
    },
    applyCouponUpdateCart: (state, action: PayloadAction<CouponResponse>) => {
      state.totalAmount = action.payload.discountedAmount;
      state.discountedAmount = action.payload.discountedAmount;
      state.discount = action.payload.discount;
      state.isCouponApplied = true;
      state.coupon = action.payload.coupon;
    },
    resetCouponApplied: (state) => {
      state.totalAmount = 0;
      state.discountedAmount = 0;
      state.discount = 0;
      state.isCouponApplied = false;
      state.coupon = '';
    },
    setCartItems: (state, action: PayloadAction<ICartItemResponse[]>) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action: PayloadAction<ICartItemResponse>) => {
      const productAlreadyExist = state.cartItems.find(
        (a) => a.productId === action.payload.id,
      );
      if (!productAlreadyExist) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems = state.cartItems.map((a) => {
          if (a.id === productAlreadyExist.id) {
            return { ...a, quantity: a.quantity + action.payload.quantity };
          } else {
            return a;
          }
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<ICartItemClient>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.cartId,
      );
    },
    increaseQuantity: (state, action: PayloadAction<ICartItemClient>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (a) => a.productId === action.payload.id,
      );
      if (cartItemIndex != -1) {
        const updatedCartItem = {
          ...state.cartItems[cartItemIndex],
          quantity: state.cartItems[cartItemIndex].quantity + 1,
        };
        state.cartItems[cartItemIndex] = updatedCartItem;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<ICartItemClient>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (a) => a.id == action.payload.cartId,
      );
      if (cartItemIndex != -1) {
        if (state.cartItems[cartItemIndex].quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id != action.payload.cartId,
          );
        } else {
          const updatedCartItem = {
            ...state.cartItems[cartItemIndex],
            quantity: state.cartItems[cartItemIndex].quantity - 1,
          };
          state.cartItems[cartItemIndex] = updatedCartItem;
        }
      }
    },
    clearCart: (state) => {
      state.paymentMode = OrderPaymentMode.ONLINE;
      state.cartItems = [];
      state.coupons = [];
      state.banners = [];
      state.products = [];
      state.myAddresses = [];
      state.totalAmount = 0;
      state.discountedAmount = 0;
      state.discount = 0;
      state.isCouponApplied = false;
      state.coupon = '';
      state.showCheckoutModal = false;
      state.showFeedbackModal = false;
      state.showCartDrawer = false;
      state.showAddAddress = false;
      state.showEditAddress = false;
      state.showPaymentView = false;
      state.selectedAddress = {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: 'India',
        fullName: '',
        phoneNumber: '',
        postalCode: '',
        type: AddressType.HOME,
        email: '',
        isDefault: false,
      };
      state.shippingConfiguration = {
        shippingCharges: 0,
        freeShippingCartValue: 499,
      };
    },
  },
});

export default cartSlice.reducer;
export const {
  setPaymentMode,
  setLoading,
  setCouponsModalOpen,
  setCartCoupons,
  setCartBanners,
  setCartProducts,
  setCartMyAddresses,
  setShowCartDrawer,
  setShowCartCheckoutModal,
  setShowCartFeedbackModal,
  setAddAddressView,
  setEditAddressView,
  setShowPaymentView,
  setSelectedAddress,
  setShippingConfiguration,
  setCartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  applyCouponUpdateCart,
  resetCouponApplied,
  clearCart,
} = cartSlice.actions;
