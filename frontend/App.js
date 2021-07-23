import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as StoreProvider} from 'react-redux';
import store from './redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {SET_TOKEN} from './redux/Actions/types';

//screens
import IntroScr from './screens/IntroScr';
import DashBoard from './screens/Dashboard/Dashboard';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createStackNavigator();
function Navigation() {
  const isAuth = useSelector(({auth}) => auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem('jwt');
      if (token) {
        dispatch({type: SET_TOKEN, payload: token});
      }
      SplashScreen.hide();
    }
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth ? (
          <>
            <Stack.Screen
              name="intro"
              component={IntroScr}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <Stack.Screen
            name="dash"
            component={DashBoard}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <PaperProvider>
      <StoreProvider store={store}>
        <Navigation />
      </StoreProvider>
    </PaperProvider>
  );
}

export default App;
