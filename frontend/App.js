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
import SocketWrapper from './SocketWrapper';
//screens
import IntroScr from './screens/IntroScr';
import DashBoard from './screens/Dashboard/UserDashboard';
import Login from './screens/Login';
import UserSignup from './screens/userSignup';
import DoctorSignup from './screens/doctorSignup';
import ChatWindow from './screens/ChatWindow';

const Stack = createStackNavigator();
function Navigation() {
  const name = useSelector(({auth}) => auth.name);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!name ? (
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="userDashboard"
              component={DashBoard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="chatwindow"
              component={ChatWindow}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <PaperProvider>
      <StoreProvider store={store}>
        <SocketWrapper>
          <Navigation />
        </SocketWrapper>
      </StoreProvider>
    </PaperProvider>
  );
}

export default App;
