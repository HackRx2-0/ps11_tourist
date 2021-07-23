import React, {useEffect, useContext} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const UserScreen = () => {
  const docs = useSelector(state => state.realtime.docs);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>Online doctors</Text>
      <TouchableOpacity
        style={styles.avl_doc}
        onPress={() => {
          navigation.navigate('chatwindow', {userId: 'jkjkj'});
        }}>
        <Image source={require('../assets/doc_icon.jpg')} style={styles.icon} />
        <Text style={{textAlign: 'left', fontSize: 24, marginLeft: 60}}>
          doc name
        </Text>
        <Text style={{marginLeft: 60}}>online</Text>
      </TouchableOpacity>
      {docs
        ? docs.map((el, i) => (
            <TouchableOpacity
              key={i}
              style={styles.avl_doc}
              onPress={() => {
                navigation.navigate('chatwindow', {userId: el.userId});
              }}>
              <Image
                source={require('../assets/doc_icon.jpg')}
                style={styles.icon}
              />
              <Text style={{textAlign: 'left', fontSize: 24, marginLeft: 60}}>
                {el.name}
              </Text>
              <Text style={{marginLeft: 60}}>online</Text>
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#23355F',
    padding: 20,
  },
  avl_doc: {
    padding: 10,
    height: 70,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#51669E',
  },
  btn: {
    marginTop: 20,
    width: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default UserScreen;
