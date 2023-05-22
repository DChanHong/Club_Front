import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  is_Login: false,
};

export const isLoginSlice = createSlice({
  name: "is_Login",
  initialState,
  reducers: {
    SET_IS_LOGIN: (state, action) => {
      state.is_Login = action.payload;
    },
    REMOVE_IS_LOGIN: (state, action) => {
      state.is_Login = action.payload;
    },
  },
});

export const { SET_IS_LOGIN, REMOVE_IS_LOGIN } = isLoginSlice.actions;

export default isLoginSlice.reducer;
