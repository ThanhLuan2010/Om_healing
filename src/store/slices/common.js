import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  persistAccessToken,
  rehydrateAccessToken,
  rehydrateProfile,
} from "@utils/persits";
import { setIsLoggedIn, setUserInfo } from "./user";

const initialState = {
  isLoading: false,
  accessToken: null,
};

export const getToken = createAsyncThunk(
  "common/getToken",
  async (_params, { rejectWithValue, dispatch }) => {
    const appUser = await rehydrateAccessToken();
    const profile = await rehydrateProfile();
    if (appUser && Object.keys(profile).length > 0) {
      dispatch(setAccessToken(appUser));
      dispatch(setIsLoggedIn(true));
      dispatch(setUserInfo(profile));

      return;
    }

    return rejectWithValue({});
  }
);

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      console.log("accessToken :>>>>>>>>>", state.accessToken);
      persistAccessToken(action.payload);
    },
  },
});

export const commonSelect = ({ common }) => common;
export const { setIsLoading, setAccessToken } = commonSlice.actions;

export default commonSlice.reducer;
