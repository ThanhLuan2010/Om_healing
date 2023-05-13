import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { dispatch, getState } from "@store/configStore";
import { setAccessToken } from "@store/slices/common";
import { setIsLoggedIn } from "@store/slices/user";
import { objectToFormData } from "@utils/helper";
import axios from "axios";
import { Alert } from "react-native";
import Config from "react-native-config";

// Url Beta
const onDeleteAccess = async () => {
  const { isLoggedIn } = getState("user");
  try {
    await dispatch(setAccessToken(""));
  } finally {
    // dispatch(setIsLoggedIn(false));
    if (!isLoggedIn) {
      return Alert.alert("Thông báo", "Phiên bản đăng nhập đã hết hạn");
    }
  }
};
export const baseQuery = async ({
  url,
  method,
  body,
  params,
  query,
  isFormData = false,
}) => {
  const { accessToken } = getState("common");
  let _query = "";
  for (const key in query) {
    _query += `&${key}=${query[key]}`;
  }

  console.log(
    "endpoint: ",
    `https://thamkhaobds.com/api/v1/${url}${_query?.replace("&", "?")}`
  );
  const option = {
    method: method ? method : "GET",
    params: params ? params : {},
    headers: {
      Accept: isFormData ? "multipart/form-data" : "application/json",
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: isFormData ? objectToFormData(body) : JSON.stringify(body),
  };
  try {
    const response = await fetch(
      "https://thamkhaobds.com/api/v1/" + url + _query?.replace("&", "?"),
      option
    );
    const resJson = await response.json();

    return resJson;

    // const result = await axios({
    //   url: `https://thamkhaobds.com/api/v1/${url}`,
    // method: method ? method : "GET",
    // data: isFormData ? objectToFormData(body) : body,
    // params: params ? params : {},
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   Authorization: `Bearer ${accessToken}`,
    //   "Access-Control-Allow-Origin": "*",
    // },
    // });
    // return { data: result.data };
  } catch (axiosError) {
    console.log("========axiosError==========", axiosError);
    if (!accessToken) {
      return;
    }
    if (axiosError.response?.status === 401 && accessToken) {
      onDeleteAccess();
    }
    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      },
    };
  }
};

export const baseQueryBlog = fetchBaseQuery({
  baseUrl: Config.API_BLOG_SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = getState()?.common;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    headers.set("accept-language", "vi");

    headers.set("Content-Type", "application/json");

    return headers;
  },
});
