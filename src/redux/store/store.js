import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../action/userSlice"
import userSignUpReducer from "../action/currrentUserSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    userSignUp: userSignUpReducer,
  },
})
