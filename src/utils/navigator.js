import { navigate } from "@navigation/RootNavigation";
import { store } from "@store";
import { setIsLoading } from "@store/slices/common";

export const showAlert = (
  title,
  message,
  submitTxt,
  cancleText,
  onSnubmit,
  onCancel
) => {
  navigate("AlertModal", {
    title,
    message,
    submitTxt,
    cancleText,
    onSnubmit,
    onCancel,
  });
};

export const showOrderCTV = (title, status, onPress) => {
  navigate("OrderModal", {
    title,
    status,
    onPress
  });
};

export const showMuonSach = (
  title,
  message,
  submitTxt,
  cancleText,
  onSnubmit,
  onCancel
) => {
  navigate("AddBookModal", {
    title,
    message,
    submitTxt,
    cancleText,
    onSnubmit,
    onCancel,
  });
};

export const setLoading = (isLoading) => {
  store.dispatch(setIsLoading(isLoading));
};
