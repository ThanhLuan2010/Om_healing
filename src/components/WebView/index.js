import {Block} from '@components';
import React from 'react';
import {Platform} from 'react-native';
import WebView from 'react-native-webview';

const WEBView = ({data, style, scrollEnabled = true}) => {
  return (
    <Block flex style={style}>
      <WebView
        androidLayerType="hardware"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        startInLoadingState={true}
        scalesPageToFit={false}
        useWebKit={true}
        originWhitelist={['*']}
        source={{
          baseUrl: '',
          html: `
          <html>
          <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width,initial-scale=1">
            ${styles}
          </head>
          <body> 
              ${data}
          </body>
          </html>`,
        }}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
      />
    </Block>
  );
};

export default WEBView;

const fileUri = Platform.select({
  ios: 'Inter-Regular.ttf',
  android: 'file:///android_asset/fonts/Inter-Regular.ttf',
});

// const fontFamily = Platform.select({
//   ios: 'Roboto',
//   android: '-apple-system',
// });

const styles = `<style type="text/css">
  @font-face {
    font-family: 'Inter-Regular';
    src: local('Inter-Regular'), url('${fileUri}') format("truetype");
  }
  * {
    font-size: 16px;
    text-align: justify;
    line-height: 1.5;
    font-family: Inter-Regular;
  }
  p {
    font-size: 16px;

  }
  body {
    margin: 0 !important;
    padding: 0 !important;
  }
  img {
    display: block;
    width: 100%;
    height: 'auto';
    padding: 0;
    margin: 10px auto;
    border-radius: 10px;
  }


</style>`;
