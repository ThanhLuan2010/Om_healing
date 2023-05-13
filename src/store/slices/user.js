import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  isRemember: false,
  phoneRemember: "",
  passRemember: "",
  isFromHome: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsRemember: (state, action) => {
      state.isRemember = action.payload;
    },
    setPhoneRemember: (state, action) => {
      state.phoneRemember = action.payload;
    },
    setPassRemember: (state, action) => {
      state.passRemember = action.payload;
    },
    setisFromHome: (state, action) => {
      state.isFromHome = action.payload;
    },
  },
});

export const userSelect = ({ user }) => user;
export const {
  setUserInfo,
  setIsLoggedIn,
  setIsRemember,
  setPhoneRemember,
  setPassRemember,
  setisFromHome,
} = userSlice.actions;

export default userSlice.reducer;
