import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Signin from './Component/Signin';
import Home from './Component/Home';
import Redirect from './Component/Redirect';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {changeIcon, getIcon} from 'react-native-change-icon';
const Stack = createNativeStackNavigator();

export default function App() {
  changeIcon('image');

  getIcon();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Redirect" component={Redirect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
