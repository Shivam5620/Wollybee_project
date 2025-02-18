import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {} = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
        sessionStorage.setItem('at', action.payload.accessToken);
      },
    resetToken: () => {
        sessionStorage.removeItem('at');
      },
  },
});

export const { setToken, resetToken } = authSlice.actions;

export default authSlice.reducer;
