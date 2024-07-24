import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {wp} from '../constants/responsive';
import Colors from '../theme/Colors';

type BorderButtonProps = {
  title: string;
  onPress?: any;
  customStyle?: StyleProp<ViewStyle>;
  icon?: any;
};

function BorderButton(props: BorderButtonProps) {
  const {onPress, title, customStyle, icon} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, customStyle]}
      onPress={onPress}>
      {icon && <Image source={icon} style={styles.imageStyle} />}
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: (wp * 1) / 100,
    flexDirection: 'row',
    height: (wp * 12) / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (wp * 25) / 100,
    borderColor: Colors.Blue,
    borderWidth: 1,
    backgroundColor: Colors.White,
  },
  titleStyle: {
    fontSize: (wp * 3.5) / 100,
    color: Colors.Blue,
  },
  imageStyle: {
    height: (wp * 5) / 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    width: (wp * 5) / 100,
    marginRight: (wp * 3) / 100,
  },
});

export default BorderButton;
