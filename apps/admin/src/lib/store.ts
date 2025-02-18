import { configureStore } from '@reduxjs/toolkit'
import permissionReducer from '@repo/ui/lib/features/permissionSlice'
import roleReducer from '@repo/ui/lib/features/roleSlice'
import authReducer from '@repo/ui/lib/features/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth : authReducer,
      permission : permissionReducer,
      roles : roleReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']