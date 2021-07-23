import React, {createContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import {
  GET_ONLINE_USERS,
  NEW_MSG,
  NEW_ONLINE_USER,
} from './redux/Actions/types';
const socket = io('http://30ab1b251625.ngrok.io', {
  autoConnect: false,
});
const WebSocketContext = createContext();
function SocketWrapper({children}) {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  const name = useSelector(state => state.auth.name);
  useEffect(() => {
    socket.on('msg', data => {
      //console.log(data);
      dispatch({type: NEW_MSG, payload: data});
    });

    socket.on('new_user', data => {
      dispatch({type: NEW_ONLINE_USER, payload: data});
    });

    socket.on('online_users', data => {
      dispatch({type: GET_ONLINE_USERS, payload: data});
    });

    return () => socket.disconnect();
  }, []);

  const sendMsg = (msg, user) => {
    socket.emit('msg', {to: user, msg});
    dispatch({
      type: NEW_MSG,
      payload: {to: user, from: socket.id, msg, self: true},
    });
  };

  const connect = () => {
    console.log("inn");
    socket.auth = {email, name};
    socket.connect();
  };

  return (
    <WebSocketContext.Provider value={{sendMsg, connect, socket}}>
      {children}
    </WebSocketContext.Provider>
  );
}
export {WebSocketContext};
export default SocketWrapper;
