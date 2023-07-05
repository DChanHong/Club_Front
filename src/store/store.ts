import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 슬라이스들 불러오기
import isLoginSlice from "./slice/isLoginSlice";
import isSliderModalSlice from "./slice/isSliderModalSlice";
import isScheduleModalSlice from "./slice/isScheduleModalSlice";
import EntranceHistorySlice from "./slice/EntranceHistorySlice";

const reducer = combineReducers({
  is_Login: isLoginSlice,
  isSliderModal: isSliderModalSlice,
  isScheduleModal: isScheduleModalSlice,
  EntranceHistorySlice: EntranceHistorySlice,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };

//스토어 생성

// const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: reducer,
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false, // 직렬화 검사 비활성화
  // }),
  // devTools: process.env.NODE_ENV !== "production",
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
