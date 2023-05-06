import { configureStore } from "@reduxjs/toolkit";

import isLoginSlice from "./slice/isLoginSlice";

//스토어 생성

export const store = configureStore({
  reducer: {
    is_Login: isLoginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
