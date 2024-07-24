import React, {useReducer, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Assets from './constants/assets';
import TextField from './components/TextField';
import Button from './components/Button';
import BorderButton from './components/BorderButton';
import {BASEURL, wp} from './constants/responsive';
import Colors from './theme/Colors';
import Toast from './components/Toast';

const Login = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!userName) {
      errors.userName = 'Please enter a username';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    const requestBody = {
      username: userName,
      password: password,
    };

    fetch('https:///api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw Toast('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        Toast('Login Successful!');
        setUserName('');
        setPassword('');
      })
      .catch(error => {
        Toast('An error occurred while login!');
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={Assets.logo} style={styles.logoStyle} />
        </View>
        <View style={styles.loginTextWrapper}>
          <Text style={styles.loginTextStyle}>Log in</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextField
            value={userName}
            prefixIcon={Assets.user}
            maxLength={30}
            onChangeText={setUserName}
            placeholder={'UserName'}
            keyboardType={'default'}
            validationMessage={errors.userName}
          />
          <TextField
            value={password}
            prefixIcon={Assets.password}
            passwordInput={true}
            isVisiblePostfixIcon={isPasswordVisible}
            secureTextEntry={isPasswordVisible}
            maxLength={10}
            onChangeText={setPassword}
            placeholder={'Password'}
            keyboardType={'default'}
            handlePasswordOnPress={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
            validationMessage={errors.password}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginButtonWrapper}>
          <Button
            title="Login"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: (wp * 4) / 100}}>
          <View style={styles.borderLineWrapper}></View>
          <Text style={styles.borderLineTextWrapper}>Or</Text>
          <View style={styles.borderLineWrapper}></View>
        </View>
        <View
          style={{
            marginTop: (wp * 2) / 100,
            width: (wp * 90) / 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <BorderButton
            icon={Assets.google}
            title={'Google'}
            customStyle={{width: (wp * 42) / 100}}
            onPress={() => {}}
          />
          <BorderButton
            icon={Assets.facebook}
            title={'Facebook'}
            customStyle={{width: (wp * 42) / 100}}
            onPress={() => {}}
          />
        </View>
        <Text style={styles.accountWrapper}>Have no account yet?</Text>
        <BorderButton
          title={'Register'}
          customStyle={{width: (wp * 90) / 100}}
          onPress={() => {
            navigation.navigate('signup');
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.White,
    alignItems: 'center',
    paddingHorizontal: (wp * 30) / 100,
  },
  logoWrapper: {
    alignItems: 'center',
    paddingTop: 70,
  },
  logoStyle: {
    width: (wp * 16) / 100,
    height: (wp * 16) / 100,
    resizeMode: 'contain',
  },
  loginTextWrapper: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
  },
  loginTextStyle: {
    color: Colors.Blue,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputWrapper: {
    paddingBottom: 10,
  },
  forgotPasswordText: {
    marginTop: (wp * 2.5) / 100,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    color: Colors.Blue,
  },
  loginButtonWrapper: {
    marginTop: (wp * 8) / 100,
  },
  borderLineWrapper: {
    width: (wp * 25) / 100,
    height: (wp * 0.4) / 100,
    alignSelf: 'center',
    backgroundColor: Colors.BorderLineColor,
  },
  borderLineTextWrapper: {
    color: Colors.PlaceholderColor,
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: (wp * 4) / 100,
  },
  accountWrapper: {
    marginTop: (wp * 5) / 100,
    marginBottom: (wp * 6) / 100,
    alignSelf: 'center',
    color: Colors.GreyColor,
    fontSize: 14,
    fontWeight: '600',
  },
});
export default Login;
