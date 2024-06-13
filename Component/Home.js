import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home() {
  const navigation = useNavigation();
  const [idToken, setIdToken] = useState(null);
  const [accesstoken, setaccess_token] = useState(null);
  const handleLogout = () => {
    AsyncStorage.clear();
    let address = StackActions.replace('Login');
    navigation.dispatch(address);
  };

  useEffect(() => {
    AsyncStorage.getItem('id_token').then(idToken => {
      if (idToken != null) {
        setIdToken(idToken);
      }
    });

    AsyncStorage.getItem('access_token').then(access_token => {
      if (access_token != null) {
        setaccess_token(access_token);
      } else {
        let address = StackActions.replace('Login');
        navigation.dispatch(address);
      }
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Home Page</Text>
      </View>
      <View>
        <Text>Access Token</Text>
      </View>
      <View style={styles.idToken}>
        <Text>{accesstoken}</Text>
      </View>
      <View>
        <Text>ID Token</Text>
      </View>
      <View style={styles.idToken}>
        <Text>{idToken}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7195dc',
  },
  buttonContainer: {
    marginTop: 20,
  },
  loginButton: {
    width: 200,
    height: 40,
    backgroundColor: '#7195dc',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  idToken: {
    marginTop: '-5%',
  },
});
