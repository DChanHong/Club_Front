import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

// 슬라이스들 불러오기
import isLoginSlice from "./slice/isLoginSlice";
import isSliderModalSlice from "./slice/isSliderModalSlice";

const reducer = combineReducers({
  is_Login: isLoginSlice,
  isSliderModal: isSliderModalSlice,
});

//스토어 생성

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
