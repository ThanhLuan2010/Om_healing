import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Listcategory: [],
};

export const userSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.Listcategory = action.payload;
    },
   
  },
});

export const bookSelect = ({book}) => book;
export const {setCategory} = userSlice.actions;

export default userSlice.reducer;
