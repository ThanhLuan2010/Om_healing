import React, {createRef, forwardRef, useImperativeHandle} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const RXStoreComponent = forwardRef((_, ref) => {
  const dispatchRx = useDispatch();
  const store = useSelector(x => x);
  useImperativeHandle(
    ref,
    () => ({
      dispatch: action => {
        dispatchRx(action);
      },
      getState: state => {
        return store[state];
      },
    }),
    [dispatchRx, store],
  );
  return null;
});

const storeRef = createRef();

export const RXStore = () => <RXStoreComponent ref={storeRef} />;

export const dispatch = action => {
  if (storeRef.current) {
    storeRef.current.dispatch(action);
  }
};
export function getState(selector) {
  if (storeRef.current) {
    return storeRef.current.getState(selector);
  }
  return {};
}
