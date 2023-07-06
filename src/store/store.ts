import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
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

const persistConfig = {
  key: "root", // 스토리지에 저장되는 데이터의 key
  storage, // storage는 각 데이터에 대한 원하는 스토리지 엔진을 지정한다.
};

const persistedReducer = persistReducer(persistConfig, reducer);
// persistReducer는 persistConfig와 rootReducer를 인수로 위하여 영구적으로 저장해야 하는 리듀서를 반환한다.

//기본으로 제공되는 미들웨어를 사용하면서 직렬화 검사 과정에서 redux-persist의 내부에 필요한 액션들을 무시하기 위해 미들웨어를
// 커스터마이징한다. 이를 통해 패치 작업이나 캐싱과 관련된 경고를 피할 수 있다.
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

// persisSotre함수를 사용하여 redux store를 영구적으로 저장하기 위한 객체를 생성한다. 이 객체를 사용하여 지정된 데이터를
//로드하거나 삭제할 수 있다.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
