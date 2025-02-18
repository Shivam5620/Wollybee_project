import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICreateRoleRequestBody, IRole } from '../../types';
import * as service from '../services/roleService'

export interface RoleState {
  roles : IRole[];
  loadingRoles : boolean;
  error : boolean;
  creatingRole : boolean;
  creatingRoleError : boolean;
  creatingRoleSuccess : boolean;
  editingRole : boolean;
  editingRoleError : boolean;
  editingRoleSuccess : boolean;
  deletingRole : boolean;
  deletingRoleError : boolean;
  deletingRoleSuccess : boolean;
}

export const fetchAllRoles = createAsyncThunk(
  'roles/all',
  async () => {
    const response = await service.fetchAllRoles();
    return response.data;
  }
);

export const fetchRoleById = createAsyncThunk(
  'role/id',
  async (id : number) => {
    const response = await service.fetchRolesById(id);
    return response.data;
  }
);

export const createRole = createAsyncThunk(
  'role/create',
  async (payload : ICreateRoleRequestBody) => {
    const response = await service.createRole(payload);
    return response.data;
  }
);

export const editRole = createAsyncThunk(
  'role/edit',
  async (payload : {id : number, payload : ICreateRoleRequestBody}) => {
    const response = await service.editRole(payload);
    return response.data;
  }
);

export const deleteRole = createAsyncThunk(
  'role/delete',
  async (id : number) => {
    const response = await service.deleteRole(id);
    return response.data;
  }
);



const initialState: RoleState = {
    roles : [],
    loadingRoles : false,
    error : false,
    creatingRole : false,
    creatingRoleError : false,
    creatingRoleSuccess : false,
    editingRole : false,
    editingRoleError : false,
    editingRoleSuccess : false,
    deletingRole : false,
    deletingRoleError : false,
    deletingRoleSuccess : false,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    resetErrors : (state) => {
      state.error = false;
      state.loadingRoles = false;
      state.creatingRole = false;
      state.creatingRoleError = false;
      state.creatingRoleSuccess = false;
      state.deletingRole = false;
      state.deletingRoleError = false;
      state.deletingRoleSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state) => {
        state.loadingRoles = true;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action: PayloadAction<IRole[]>) => {
        state.roles = action.payload;
        state.loadingRoles = false;
      })
      .addCase(fetchAllRoles.rejected, (state) => {
        state.loadingRoles = false;
        state.error = true;
      })
      .addCase(fetchRoleById.pending, (state) => {
        state.loadingRoles = true;
      })
      .addCase(fetchRoleById.fulfilled, (state, action: PayloadAction<IRole>) => {
        if(state.roles.length == 0){
          state.roles.push(action.payload);
        }else{
        state.roles = state.roles.map((a) =>{
          if(a.id == action.payload.id){
            return action.payload;
          }else{
            return a;
          }
        })
        }
        state.loadingRoles = false;
      })
      .addCase(fetchRoleById.rejected, (state) => {
        state.loadingRoles = false;
        state.error = true;
      })
      .addCase(createRole.pending, (state) => {
        state.creatingRole = true;
      })
      .addCase(createRole.fulfilled, (state, action: PayloadAction<IRole>) => {
        state.creatingRoleSuccess = true;
        state.roles.push(action.payload);
        state.creatingRole = false;
      })
      .addCase(createRole.rejected, (state) => {
        state.creatingRole = false;
        state.creatingRoleError = true;
      })
      .addCase(editRole.pending, (state) => {
        state.editingRole = true;
      })
      .addCase(editRole.fulfilled, (state, action: PayloadAction<IRole>) => {
        state.editingRoleSuccess = true;
        state.roles.push(action.payload);
        state.editingRole = false;
      })
      .addCase(editRole.rejected, (state) => {
        state.editingRole = false;
        state.editingRoleError = true;
      })
      .addCase(deleteRole.pending, (state) => {
        state.deletingRole = true;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.deletingRoleSuccess = true;
        state.deletingRole = false;
      })
      .addCase(deleteRole.rejected, (state) => {
        state.deletingRole = false;
        state.deletingRoleError = true;
      })
  },
});

export const { resetErrors } = roleSlice.actions;
export default roleSlice.reducer;
