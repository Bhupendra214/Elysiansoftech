import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {wp} from '../constants/responsive';
import Colors from '../theme/Colors';
import Assets from '../constants/assets';

type TextFieldProps = {
  autoCapitalize?: any;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  returnKeyType?: 'done';
  maxLength?: number;
  disabled?: boolean;
  secureTextEntry?: boolean;
  prefixIcon?: any;
  isVisiblePostfixIcon?: boolean;
  handlePasswordOnPress?: any;
  passwordInput?: boolean;
  validationMessage: string;
};

function TextField(props: TextFieldProps) {
  const {
    value,
    placeholder,
    autoCapitalize,
    onChangeText,
    keyboardType,
    returnKeyType,
    maxLength,
    disabled,
    secureTextEntry,
    prefixIcon,
    isVisiblePostfixIcon,
    handlePasswordOnPress,
    passwordInput,
    validationMessage,
  } = props;
  return (
    <>
      <View style={styles.input}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={prefixIcon} style={styles.imageStyle} />
            <TextInput
              style={{width: (wp * 75) / 100}}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={Colors.PlaceholderColor}
              onChangeText={(value: string) => onChangeText(value)}
              secureTextEntry={secureTextEntry}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
              selectionColor={Colors.Black}
              maxLength={maxLength}
              returnKeyType={returnKeyType}
              editable={disabled}
            />
          </View>
          {passwordInput && (
            <TouchableOpacity
              onPress={handlePasswordOnPress}
              style={{alignSelf: 'center'}}>
              <Image
                source={isVisiblePostfixIcon ? Assets.eye : Assets.hide}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.errorMessage}>{validationMessage}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: (wp * 2) / 100,
    height: (wp * 12) / 100,
    width: (wp * 90) / 100,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: Colors.White,
    borderColor: Colors.BorderColor,
    borderRadius: (wp * 2.0) / 100,
    paddingHorizontal: (wp * 2.5) / 100,
  },
  errorMessage: {
    color: Colors.Red,
    fontSize: 16,
    fontWeight: '400',
  },
  imageStyle: {
    height: (wp * 5) / 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    width: (wp * 5) / 100,
    tintColor: Colors.PlaceholderColor,
  },
});

export default TextField;
