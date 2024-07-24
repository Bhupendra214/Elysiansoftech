import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {wp} from '../constants/responsive';
import Colors from '../theme/Colors';

type ButtonProps = {
  title: string;
  onPress?: any;
};

function Button(props: ButtonProps) {
  const {onPress, title} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: (wp * 1) / 100,
    width: (wp * 90) / 100,
    height: (wp * 12) / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (wp * 25) / 100,
    backgroundColor: Colors.DarkBlue,
  },
  titleStyle: {
    fontSize: (wp * 3.5) / 100,
    color: Colors.White,
  },
});

export default Button;
