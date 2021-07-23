import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {WebSocketContext} from '../SocketWrapper';

const ChatWindow = ({navigation, route}) => {
  const webSocket = useContext(WebSocketContext);
  const {userId, name} = route.params;
  const msgs = useSelector(state => state.realtime.msg);
  const [msg, setMsg] = useState('');

  const Item = ({msg, self}) => (
    <View style={self ? styles.msg_me : styles.msg}>
      <Text>{msg}</Text>
    </View>
  );
  const renderItem = ({item}) => <Item msg={item.msg} self={item.self} />;
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{fontSize: 24}}>{name}</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('videochat', {id: userId})}>
          video
        </Button>
      </View>
      <FlatList
        style={{marginTop: 90, width: '100%', padding: 10}}
        data={msgs}
        renderItem={renderItem}
      />
      <View style={styles.msg_box}>
        <TextInput
          style={styles.inp}
          placeholder="Enter your message ..."
          defaultValue={msg}
          onChangeText={text => setMsg(text)}
        />
        <Button
          style={styles.send}
          mode="contained"
          color="#1a2746"
          disabled={msg ? false : true}
          onPress={() => {
            webSocket.sendMsg(msg, userId);
            setMsg('');
          }}>
          send
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#23355F',
  },
  topBar: {
    padding: 10,
    height: 80,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: 0,
    width: '100%',
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
  msg_box: {
    padding: 10,
  },
  inp: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#000',
  },
  send: {
    position: 'absolute',
    right: 10,
    top: 15,
    width: '20%',
  },
  msg_me: {
    width: '50%',
    backgroundColor: '#BBCFF4',
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 0,
    marginLeft: '50%',
  },
  msg: {
    width: '50%',
    backgroundColor: '#7E9EDD',
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: '50%',
    marginLeft: 0,
  },
});

export default ChatWindow;
