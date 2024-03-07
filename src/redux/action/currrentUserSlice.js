import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userSignUp: [],
}

export const userSignUpSlice = createSlice({
  name: "userSignUp",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userSignUp[0] = (action.payload)
    },
    removeUser : (state) => {
      state.userSignUp.pop();
    }
  },
})

export const { addUser, removeUser } = userSignUpSlice.actions

export default userSignUpSlice.reducer
