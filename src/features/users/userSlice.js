import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
}

export const userSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    logInUsers: (state,action) => {
      
      state.userInfo = action.payload
    },
    logOutUsers: (state) => {
      
      state.userInfo = null
    },
  },
})

export const { logInUsers, logOutUsers } = userSlice.actions

export default userSlice.reducer