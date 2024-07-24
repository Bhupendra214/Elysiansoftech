import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-root-toast';
import Colors from '../theme/Colors';

export default (message: string) => {
  return Toast.show(
    <View style={styles.container}>
      <Text style={styles.toastMessageStyle}>{message}</Text>
    </View>,
    {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 1,
      backgroundColor: Colors.Blue,
      textColor: Colors.White,
    },
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 300,
    minHeight: 35,
    borderRadius: 65,
    padding: 10,
  },
  toastMessageStyle: {
    color: Colors.White,

    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '600',
  },
});
