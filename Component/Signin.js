import {useEffect, useRef, useState} from 'react';
import {authorize} from 'react-native-app-auth';
import {
  Animated,
  Easing,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Link, StackActions, useNavigation} from '@react-navigation/native';

import Codechalenge from './PKCE/Codechallenege';
import AsyncStorage from '@react-native-async-storage/async-storage';
var styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
  },
  inputField: {
    width: '80%',
    backgroundColor: 'white',
    height: 35,
    margin: '3%',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  loginButton: {
    width: '80%',
    height: 35,
    backgroundColor: '#7195dc',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupButton: {
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  loginHeading: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: '#7195dc',
    fontWeight: 'bold',
  },
  oktabutton: {
    width: '80%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'aliceblue',
    borderWidth: 1,
    borderColor: '#7195dc',
  },
  oktacontext: {
    color: '#7195dc',
    fontWeight: 'bold',
  },
});

export default function Signin() {
  let codeVerifier = () => {
    let result = '';
    while (result.length < 50) {
      result += (Math.random() + 43).toString(36).substring(3);
    }

    return result;
  };
  let navigation = useNavigation();
  const [password, setpassword] = useState('');
  const [username, setusername] = useState('');
  const [code, setcode] = useState('');
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const authorizationUrl =
    'https://oie-demo-trevonix.okta.com/oauth2/v1/authorize';
  const tokenEndpoint = 'https://oie-demo-trevonix.okta.com/oauth2/v1/token';
  const clientId = '0oaef56b1r2eq4W5Q697';
  const redirectUri = 'com.pkce:/callback';
  const responseType = 'code';
  const grant_type = 'authorization_code';
  const scope = 'openid';
  const state = '1234';
  const codeVerify = codeVerifier();
  const Challenge = Codechalenge(codeVerify);

  const rotation = useRef(new Animated.Value(0)).current;
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotate = Animated.loop(
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1500,
      eaeasing: Easing.linear,
      useNativeDriver: true,
    }),
  );
  const config = {
    issuer: 'https://oie-demo-trevonix.okta.com/oauth2/default',
    clientId: '0oaef56b1r2eq4W5Q697',
    redirectUrl: 'com.pkce:/callback',
    scopes: ['openid', 'profile'],
    usePKCE: true,
  };

  const handleoktalogin = async () => {
    setLoading(true);
    const result = await authorize(config);
    if (result.accessToken) {
      AsyncStorage.setItem('id_token', result.idToken);
      AsyncStorage.setItem('access_token', result.accessToken);
      let address = StackActions.replace('Home');
      navigation.dispatch(address);
    } else {
      console.log('No id_token found in the deep link data.');
      let address = StackActions.replace('Login');
      navigation.dispatch(address);
    }
    console.log('"accessToken":', result);
  };
  useEffect(() => {
    AsyncStorage.getItem('access_token').then(idToken => {
      if (idToken !== null) {
        let address = StackActions.replace('Home');
        navigation.dispatch(address);
      }
    });
  });

  return (
    <View>
      {loading ? (
        <View style={styles.loading}>
          <Animated.View
            style={[styles.circle, {transform: [{rotate: spin}]}]}
          />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.loginHeading}>LOG IN</Text>
            <TextInput
              value={username}
              onChangeText={setusername}
              style={styles.inputField}
              placeholder="Username"
            />
            <TextInput
              value={password}
              onChangeText={setpassword}
              style={styles.inputField}
              secureTextEntry={true}
              placeholder="Password"
            />
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <Text>Or</Text>
            <TouchableOpacity
              style={styles.oktabutton}
              onPress={handleoktalogin}>
              <Text style={styles.oktacontext}>LOGIN WITH OKTA </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
