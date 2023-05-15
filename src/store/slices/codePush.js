import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdate: false,
  progres: null,
};

export const codePushSlice = createSlice({
  name: "codePush",
  initialState,
  reducers: {
    setisUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    setProgress: (state, action) => {
      state.progres = action.payload;
    },
  },
});

export const codePushSelect = ({ codePush }) => codePush;
export const { setisUpdate,setProgress } = codePushSlice.actions;

export default codePushSlice.reducer;
