/* eslint-disable react-hooks/exhaustive-deps */
// import {useDeviceTokenMutation} from '@api/user';
import { Block, Loader, NetWork } from "@components";
import messaging from "@react-native-firebase/messaging";
import { commonSelect } from "@store/slices/common";
import React, { useEffect, useState } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import RootStack from "./navigation/RootStack";
import { store } from "./store";
import { RXStore } from "./store/configStore";
import LoadingScreen from "@screens/LoadingScreen";
import { height, width } from "@utils/responsive";
import { codePushSelect, codePushSlice } from "@store/slices/codePush";
import CodePushUpdate from "./modal/CodePushUpdate";

const App = () => {
  const { isLoading } = useSelector(commonSelect);
  const [isLoadingView, setisLoadingView] = useState(true);
  const { isUpdate, progres } = useSelector(codePushSelect);
  useEffect(() => {
    messaging().requestPermission();
    setTimeout(() => {
      SplashScreen.hide();
    }, 10);
    setTimeout(() => {
      setisLoadingView(false);
    }, 20);
    messaging().onMessage(async (remoteMessage) => {
      const { notification } = remoteMessage;
      showMessage({
        message: notification?.title || "Thông báo",
        type: "default",
        description: notification?.body,
      });
    });
  }, []);

  return (
    <>
      <RootStack />
      {isLoading && <Loader />}
      <RXStore />
      {isLoadingView && (
        <Block absolute width={width} height={height}>
          <LoadingScreen />
        </Block>
      )}
      {isUpdate && (
        <Block absolute width={width} height={height}>
          <CodePushUpdate />
        </Block>
      )}

      <FlashMessage
        style={{ paddingTop: 40, borderRadius: 8 }}
        position="top"
      />
    </>
  );
};

const AppWrapper = () => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MenuProvider>
            <App />
            <NetWork />
          </MenuProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
