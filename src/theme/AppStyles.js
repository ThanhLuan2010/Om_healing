import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export const AppStyles = StyleSheet.create({
  // column
  column: {
    flexDirection: 'column',
  },
  columnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCenterTop: {
    alignItems: 'center',
  },
  columnCenterBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  columnCenterLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  columnCenterRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  columnCenterVertical: {
    justifyContent: 'center',
  },
  // row
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterTop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowCenterBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rowCenterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTopBetween: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rowBottomBetween: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  viewShadow: {
    borderColor: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    shadowOffset: {height: 1.5, width: 0},
    elevation: 5,
  },
  viewShadowAbsolute: {
    borderColor: 'white',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {height: 2, width: 0},
    // elevation: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  viewAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomSpace: {
    marginBottom: getSize.m(36),
  },
});
