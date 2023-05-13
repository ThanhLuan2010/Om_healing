import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import book from "./slices/book";
import common from "./slices/common";
import user from "./slices/user";
import product from "./slices/products";
import order from './slices/order'
import search from './slices/search'

const reducers = combineReducers({
  user,
  common,
  book,
  product,
  order,
  search
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat(
  //     createLogger(),
  //     userApi.middleware,
  //     blogApi.middleware,
  //     dashboardApi.middleware,
  //     eventApi.middleware,
  //     notificationApi.middleware,
  //     projectApi.middleware,
  //     infoApi.middleware,
  //   ),
});
