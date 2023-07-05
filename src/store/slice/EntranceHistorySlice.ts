import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { userClubHistoryList } from "@/Types";

interface State {
  HistoryList: userClubHistoryList[];
}

const initialState: State = {
  HistoryList: [],
};

const EntranceHistorySlice = createSlice({
  name: "historyList",
  initialState,
  reducers: {
    ADD_CLUB_ENTRANCE: (
      state,
      action: PayloadAction<userClubHistoryList[]>
    ) => {
      //중복 항목을 제거한 새로운 배열을 생성
      const newHistoryList = action.payload.filter((newItem) => {
        return !state.HistoryList.some(
          //인전 HistoryList에 같은 항목이 없으면 추가한다.
          (existingItem) => existingItem.C_IDX === newItem.C_IDX
        );
      });
      state.HistoryList.push(...newHistoryList);
    },

    REMOVE_CLUB_ENTRANCE: (state, action: PayloadAction<number>) => {
      state.HistoryList = state.HistoryList.filter(
        (item) => item.C_IDX !== action.payload
      );
    },
  },
});

export const { ADD_CLUB_ENTRANCE, REMOVE_CLUB_ENTRANCE } =
  EntranceHistorySlice.actions;

export default EntranceHistorySlice.reducer;
