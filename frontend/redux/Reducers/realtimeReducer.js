import {
  GET_ONLINE_USERS,
  NEW_MSG,
  SEND_MSG,
  NEW_ONLINE_USER,
} from '../Actions/types';

const initialState = {
  users: [],
  msg: [],
};

const realtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONLINE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case NEW_ONLINE_USER:
      const newDoc = [...state.users, action.payload];
      return {
        ...state,
        users: newDoc,
      };
    case NEW_MSG:
      const newMsg = [...state.msg, action.payload];
      return {
        ...state,
        msg: newMsg,
      };
    case SEND_MSG:
      const newsendMsg = [...state.msg, {...action.payload, self: true}];
      return {
        ...state,
        msg: newsendMsg,
      };

    default:
      return state;
  }
};

export default realtimeReducer;
