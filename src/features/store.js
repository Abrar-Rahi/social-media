import { configureStore } from '@reduxjs/toolkit'
import userSlice from './users/userSlice'
import { authApi } from './api/authApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    registration : userSlice
  },
  devTools : import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),

})