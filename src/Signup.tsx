import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BorderButton from './components/BorderButton';
import TextField from './components/TextField';
import Assets from './constants/assets';
import {wp} from './constants/responsive';
import Button from './components/Button';
import Colors from './theme/Colors';
import Toast from './components/Toast';
import axios from 'axios';

const SignUp = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfimPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!userName) {
      errors.userName = 'Please enter a username';
    }
    if (!email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      handleSignUp();
    }
  };

  const handleSignUp = () => {
    const requestBody = {
      username: userName,
      email: email,
      password: password,
    };
    fetch('https://localhost:8000/api/auth/signup/', {
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
        Toast('SignUp Successful!');
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        callMessageAPI();
      })
      .catch((error: any) => {
        Toast('An error occurred while login!');
      });
  };

  const callMessageAPI = () => {
    let config = {
      method: 'post',
      url: 'https://node-app-dwa7gjejhfa5e8ar.eastus-01.azurewebsites.net/get-message',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    };

    axios
      .request(config)
      .then(response => {
        Toast(response.data.msg);
      })
      .catch(error => {
        Toast(error.response.data.erro);
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={Assets.logo} style={styles.logoStyle} />
        </View>
        <View style={styles.loginTextWrapper}>
          <Text style={styles.loginTextStyle}>Sign Up</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextField
            value={userName}
            prefixIcon={Assets.user}
            maxLength={30}
            onChangeText={setUserName}
            placeholder={'User Name'}
            keyboardType={'default'}
            validationMessage={errors.userName}
          />
          <TextField
            value={email}
            prefixIcon={Assets.email}
            maxLength={30}
            onChangeText={setEmail}
            placeholder={'Email'}
            keyboardType={'email-address'}
            validationMessage={errors.email}
          />
          <TextField
            value={password}
            prefixIcon={Assets.password}
            passwordInput
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
          <TextField
            value={confirmPassword}
            passwordInput
            prefixIcon={Assets.password}
            isVisiblePostfixIcon={isConfimPasswordVisible}
            secureTextEntry={isConfimPasswordVisible}
            maxLength={10}
            onChangeText={setConfirmPassword}
            placeholder={'Confirm Password'}
            keyboardType={'default'}
            handlePasswordOnPress={() => {
              setIsConfirmPasswordVisible(!isConfimPasswordVisible);
            }}
            validationMessage={errors.confirmPassword}
          />
        </View>
        <View style={styles.loginButtonWrapper}>
          <Button
            title="Sign Up"
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
          title={'Login'}
          customStyle={styles.loginButtonCustomStyle}
          onPress={() => {
            navigation.navigate('login');
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
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.Blue,
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
  loginButtonCustomStyle: {
    width: (wp * 90) / 100,
    marginBottom: (wp * 5) / 100,
  },
});
export default SignUp;
