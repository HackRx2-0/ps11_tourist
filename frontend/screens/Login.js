import axios from 'axios';
import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {IconButton as Button} from 'react-native-paper';
import Carousel from './Carousel/Carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {SET_TOKEN} from '../redux/Actions/types';

const Login = ({navigation}) => {
  var [email, setEmail] = React.useState('');
  var [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    const params = JSON.stringify({
      email: email,
      password: password,
    });

    axios
      .post('api/login', params, {
        headers: {'content-type': 'application/json'},
      })
      .then(async res => {
        // store the token
        await AsyncStorage.setItem('jwt', res.data.jwt);
        dispatch({type: SET_TOKEN, payload: res.data.jwt});
      })
      .catch(err => {
        console.warn(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_view}>
        <Text style={styles.top_text}>InstantDoc</Text>
        <Carousel
          itemsPerInterval={1}
          items={[
            {
              label:
                'Teleconsult experienced doctors at the comfort at your home!',
              imgPath: require('../assets/doctor_consult.png'),
            },
            {
              label: 'Find clinic and mcuh more....',
              imgPath: require('../assets/clinic.png'),
            },
            {
              label: 'Book vaccination slot',
              imgPath: require('../assets/vaccination.png'),
            },
          ]}
        />
      </View>
      <View style={styles.login_view}>
        <Text style={styles.log_txt}>Login</Text>
        <TextInput
          placeholder="Email Id"
          placeholderTextColor="#3A4D7F"
          style={styles.inp}
          value={email}
          autoCompleteType="email"
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#3A4D7F"
          style={styles.inp}
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <Button
          style={styles.btn}
          icon="chevron-right-circle-outline"
          color="#fff"
          size={40}
          onPress={() => handleLogin()}
        />
        <Text style={{textAlign: 'center', color: 'white'}}>
          New User?{' '}
          <Text
            style={{color: 'blue'}}
            onPress={() => navigation.navigate('signup')}>
            Sign up
          </Text>{' '}
        </Text>
        <Text style={{textAlign: 'center', color: 'blue', marginTop: 20}}>
          For doctors
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#23355F',
    alignItems: 'center',
  },
  top_text: {
    fontFamily: 'RobotoBold-Xdoj',
    fontSize: 36,
    textAlign: 'center',
    color: '#fff',
    // marginBottom: 10
  },
  top_view: {
    marginTop: '5%',
    padding: 50,
  },
  login_view: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#3A4D7F',
    width: '100%',
    padding: 10,
    display: 'flex',
  },
  log_txt: {
    fontFamily: 'RobotoBold-Xdoj',
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
  inp: {
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#fff',
    color: '#3A4D7F',
    paddingLeft: 20,
    alignSelf: 'center',
    width: '85%',
  },
  btn: {
    marginTop: 20,
    width: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Login;
