import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.push(action.payload)
    },
    updateUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser, updateUser } = userSlice.actions

export default userSlice.reducer
