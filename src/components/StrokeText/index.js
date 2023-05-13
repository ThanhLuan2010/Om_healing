import { theme } from '@theme';
import React from 'react';
import Svg, {Text} from 'react-native-svg';

class Stroketext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      stroke = theme.colors.white,
      strokeWidth = 0.3,
      color = 'white',
      fontSize = 20,
      title = '',
      style,
      height = 46,
      width = '100%',
      y = '20',
    } = this.props;
    return (
      <Svg height={height} width={width} style={style}>
        <Text
          fill={color}
          strokeWidth={strokeWidth}
          stroke={stroke}
          fontSize={fontSize}
          fontFamily={theme.fonts.fontFamily.BeVietnamPro}
          x="50%"
          y={y}
          textAnchor="middle">
          {title}
        </Text>
      </Svg>
    );
  }
}
export default Stroketext;
