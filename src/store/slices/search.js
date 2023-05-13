import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listSearch: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setListSearch: (state, action) => {
      let data = state.listSearch;

      if (data?.length === 0) {
        data = [action.payload];
      }
      if (data?.length < 5) {
        data = data?.concat(action.payload);
      } else {
        data?.reverse()?.pop();
        data = data?.reverse()?.concat(action.payload);
      }
      state.listSearch = data;
    },
  },
});

export const searchSelect = ({ search }) => search;
export const { setListSearch } = searchSlice.actions;

export default searchSlice.reducer;
