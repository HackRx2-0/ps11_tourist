import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {IconButton as Button} from 'react-native-paper';

const IntroScr = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.text_view}>
        <Text style={styles.top_text}>Welcome to InstantDoc!</Text>
        <Text style={{color: '#BBCFF4', textAlign: 'center'}}>
          A place where you can easily consult doctors at the comfort at your
          home!
        </Text>
      </View>
      <Button
        icon="chevron-right-circle-outline"
        color="#fff"
        size={40}
        onPress={() => navigation.navigate('login')}
      />
      <Image
        style={styles.doc_img}
        source={require('../assets/Doctor-pana.png')}
      />
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
  doc_img: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    bottom: 0,
  },
  top_text: {
    color: '#fff',
    fontFamily: 'RobotoBold-Xdoj',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  text_view: {
    marginTop: '30%',
    paddingTop: 50,
    paddingHorizontal: 50,
    paddingBottom: 20,
  },
});

export default IntroScr;
