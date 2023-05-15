import { images } from "@assets";
import { dispatch } from "@store/configStore";
import { setProgress, setisUpdate } from "@store/slices/codePush";
import { theme } from "@theme";
import { setLoading } from "@utils/navigator";
import { height, width } from "@utils/responsive";
import React, { Component } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import codePush from "react-native-code-push";
import LinearGradient from "react-native-linear-gradient";
export class LoadingScreenChild extends Component {
  componentDidMount() {
    setLoading(false);
    // dispatch(setisUpdate(true))
    this.syncImmediate();
    this.state = {
      showModal: false,
    };
  }
  codePushStatusDidChange = (status) => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Chescking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("====Downloading package.");
        // show modal
        dispatch(setisUpdate(true));
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("=====Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("========UP_TO_DATE");
        dispatch(setisUpdate(false));
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("========Update installed.");
        dispatch(setisUpdate(false));
        codePush.restartApp();
        break;
    }
  };
  codePushDownloadDidProgress = (progress) => {
    dispatch(setProgress(progress));
  };
  syncImmediate = () => {
    codePush.sync(
      {
        checkFrequency: codePush.CheckFrequency.ON_APP_START,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      this.codePushStatusDidChange,
      this.codePushDownloadDidProgress
    );
  };
  render() {
    return (
      <>
        <LinearGradient
          style={[styles.backgroundColor, { paddingTop: 40 }]}
          colors={theme.colors.backgroundColor}
        >
          <Image source={images.loadingBg} style={styles.bg} />
          <ActivityIndicator
            color={"white"}
            size={"large"}
            style={{
              position: "absolute",
              top: height / 2,
              alignSelf: "center",
            }}
          />
          <Image source={images.logo} style={styles.logo} />
        </LinearGradient>
      </>
    );
  }
}

export default codePush({
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(LoadingScreenChild);

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
  },
  logo: {
    width: width - 46 * 2,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 40,
  },
  bg: {
    position: "absolute",
    zIndex: -2,
    bottom: 0,
  },
});
