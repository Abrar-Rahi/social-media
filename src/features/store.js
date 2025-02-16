import { configureStore } from '@reduxjs/toolkit'
import userSlice from './users/userSlice'
import { authApi } from './api/authApi'
import themeSlice from './theme/themeSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userInformation : userSlice, 
    themeMode : themeSlice
  },
  devTools : import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),

})