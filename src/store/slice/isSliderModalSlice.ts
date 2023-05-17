import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSliderModal: false,
};

export const isSliderModalSlice = createSlice({
  name: "isSliderModal",
  initialState,
  reducers: {
    OPEN_SLIDER_MODAL: (state, action) => {
      state.isSliderModal = action.payload;
    },
    CLOSE_SLIDER_MODAL: (state, action) => {
      state.isSliderModal = action.payload;
    },
  },
});

export const { OPEN_SLIDER_MODAL, CLOSE_SLIDER_MODAL } =
  isSliderModalSlice.actions;

export default isSliderModalSlice.reducer;
