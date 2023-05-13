import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Listcategory: [],
  ListProduct: [],
  ListBranch: [],
  listSearch: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.Listcategory = action.payload;
    },
    setListProduct: (state, action) => {
      let data = state.ListProduct;
      if (action.payload.current_page === 1) {
        data = action.payload;
      } else {
        data = { ...data, data: data.data.concat(action.payload.data) };
      }
      state.ListProduct = data;
    },
    setListBranch: (state, action) => {
      state.ListBranch = action.payload;
    },
    setListSearch: (state, action) => {
      let data = state.listSearch;
      console.log("====data====", data);
      console.log("====state.listSearch====", state.listSearch);
      console.log("====state====", state);
      if (data?.length < 5) {
        data = data?.concat(action.payload);
      } else {
        const dataPop = data.pop();
        data = dataPop.concat(action.payload);
      }
      state.listSearch = data;
    },
  },
});

export const productSelect = ({ product }) => product;
export const { setCategory, setListProduct, setListBranch, setListSearch } =
  productSlice.actions;

export default productSlice.reducer;
