import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as service from '../services/permissionService';
import {  IPermission } from '../../types';


export interface PermissionState {
  permissions : IPermission[];
  loadingPermissions : boolean;
  errorPermissions : boolean;
}

export const fetchAllPermissions = createAsyncThunk(
  'permission/all',
  async () => {
    const response = await service.fetchAllPermissions();
    return response.data;
  }
);


const initialState: PermissionState = {
    permissions : [],
    loadingPermissions : false,
    errorPermissions : false,
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPermissions.pending, (state) => {
        state.loadingPermissions = true;
      })
      .addCase(fetchAllPermissions.fulfilled, (state, action: PayloadAction<IPermission[]>) => {
        state.permissions = action.payload;
        state.loadingPermissions = false;
      })
      .addCase(fetchAllPermissions.rejected, (state) => {
        state.loadingPermissions = false;
        state.errorPermissions = true;
      })
  },
});


export default permissionSlice.reducer;
