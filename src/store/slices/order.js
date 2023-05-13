import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOrder: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setListOrder: (state, action) => {
      state.listOrder = action.payload;
    },
  },
});

export const orderSelect = ({ order }) => order;
export const { setListOrder } = orderSlice.actions;

export default orderSlice.reducer;
