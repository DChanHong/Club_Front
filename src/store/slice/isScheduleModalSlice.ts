import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isScheduleModal: false,
};

export const isScheduleModalSlice = createSlice({
  name: "isScheduleModal",
  initialState,
  reducers: {
    OPEN_SCHEDULE_MODAL: (state, action) => {
      state.isScheduleModal = action.payload;
    },
    CLOSE_SCHEDULE_MODAL: (state, action) => {
      state.isScheduleModal = action.payload;
    },
  },
});

export const { OPEN_SCHEDULE_MODAL, CLOSE_SCHEDULE_MODAL } =
  isScheduleModalSlice.actions;

export default isScheduleModalSlice.reducer;
