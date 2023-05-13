/* eslint-disable react-hooks/exhaustive-deps */
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {StyleSheet, View} from 'react-native';

import {theme} from '@theme';
import {getSize} from '@utils/responsive';

const BottomSheetComponent = ({snapPoints, children, setOpen}, ref) => {
  useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  const snaps = useMemo(() => snapPoints, []);
  const bottomSheetRef = useRef();
  const onOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const onClose = () => {
    bottomSheetRef.current?.close();
  };

  const handleSheetChanges = useCallback(index => {
    setOpen(index === 0 ? true : false);
  }, []);

  const renderBackdrop = useCallback(props => {
    return (
      <BottomSheetBackdrop
        {...props}
        opacity={0.4}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  }, []);

  const renderHandle = useCallback(() => {
    return (
      <View
        style={[
          styles.handle,
          {
            backgroundColor: 'transparent',
          },
        ]}
      />
    );
  }, []);
  const renderBackground = useCallback(() => {
    return (
      <View
        style={[
          {
            backgroundColor: theme.colors.white,
            borderRadius: getSize.m(30),
          },
        ]}
      />
    );
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snaps}
      // enablePanDownToClose
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      onChange={handleSheetChanges}
      backgroundComponent={renderBackground}
      handleComponent={renderHandle}
      enableOverDrag={false}
      backdropComponent={renderBackdrop}>
      {children}
    </BottomSheet>
  );
};

const BottomSheetCustomRef = forwardRef(BottomSheetComponent);

export default BottomSheetCustomRef;

const styles = StyleSheet.create({
  wrapSheet: {
    borderRadius: getSize.m(40),
  },
  handle: {
    height: getSize.m(10),
    width: getSize.m(40),
    borderRadius: getSize.m(5),
    alignSelf: 'center',
    marginTop: getSize.m(10),
  },
});
