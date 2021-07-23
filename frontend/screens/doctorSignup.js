import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import Carousel from './Carousel/Carousel';
import { IconButton as Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SET_TOKEN } from '../redux/Actions/types';

const DoctorSignup = ({ navigation }) => {
  const dispatch = useDispatch();
  var [email, setEmail] = React.useState('');
  var [password, setPassword] = React.useState('');

  var [firstName, setFirstName] = React.useState('');
  var [lastName, setLastName] = React.useState('');
  var [phone_number, setPhoneNumber] = React.useState('');
  var [specialisation, setSpecialisation] = React.useState('')
  var [fees, setFees] = React.useState(0)

  var [change, setChange] = React.useState(false);

  const handleSignup = () => {
    const params = JSON.stringify({
      credentials: {
        email: email,
        password: password,
      },
      data: {
        phone_number,
        first_name: firstName,
        last_name: lastName,
        specialisation: specialisation,
        fees: fees,
      },
    });

    const url = 'api/signup/doctor';
    axios
      .post(url, params, { headers: { 'content-type': 'application/json' } })
      .then(async res => {
        // store the token
        await AsyncStorage.setItem('jwt', res.data.jwt);
        dispatch({ type: SET_TOKEN, payload: res.data.jwt });
        // navigation.navigate('dashboard')
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
      {change === true ? (
        <View style={styles.login_view}>
          <Text style={styles.log_txt}>Tell us more about yourself</Text>
          <TextInput
            placeholder="Phone number"
            placeholderTextColor="#3A4D7F"
            style={styles.inp}
            value={phone_number}
            onChangeText={phone_number => setPhoneNumber(phone_number)}
          />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#3A4D7F"
            style={styles.inp}
            value={firstName}
            onChangeText={first_name => setFirstName(first_name)}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#3A4D7F"
            style={styles.inp}
            value={lastName}
            onChangeText={last_name => setLastName(last_name)}
          />
          <TextInput
            placeholder="Specialisation"
            placeholderTextColor="#3A4D7F"
            style={styles.inp}
            value={specialisation}
            onChangeText={sp => setSpecialisation(sp)}
          />
          <TextInput
            placeholder="Fess"
            placeholderTextColor="#3A4D7F"
            style={styles.inp}
            value={fees}
            onChangeText={fee => setLastName(fee)}
          />
          <Button
            style={styles.btn}
            icon="chevron-right-circle-outline"
            color="#fff"
            size={40}
            onPress={() => handleSignup()}
          />
          <Button
            style={styles.btn}
            icon="chevron-left-circle-outline"
            color="#fff"
            size={40}
            onPress={() => setChange(false)}
          />
        </View>
      ) : (
        <View style={styles.login_view}>
          <Text style={styles.log_txt}>Sign Up</Text>
          <TextInput
            placeholder="Email Id"
            placeholderTextColor="#3A4D7F"
            style={styles.inp}
            autoCompleteType="email"
            value={email}
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
            onPress={() => setChange(true)}
          />
          <Text style={{ textAlign: 'center' }}>
            Existing User?{' '}
            <Text
              style={{ color: 'blue' }}
              onPress={() => navigation.navigate('login')}>
              Login
            </Text>{' '}
          </Text>
          <Text style={{ textAlign: 'center', color: 'blue', marginTop: 20 }}>
            For doctors{' '}
            <Text
              style={{ color: 'blue' }}
              onPress={() => navigation.navigate('dashboard')}>
              Dashboard
            </Text>
          </Text>
        </View>
      )}
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
    marginBottom: 0,
    color: '#fff',
  },
  top_view: {
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
    fontSize: 33,
    textAlign: 'center',
    color: '#fff',
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
    marginVertical: 15,
    width: 100,
    alignSelf: 'center',
  },
});

export default DoctorSignup;
