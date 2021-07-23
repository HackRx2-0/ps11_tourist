import {REMOVE_TOKEN, ADD_USER, SET_TOKEN} from '../Actions/types';

const initialState = {
  token: '',
  name: '',
  type: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_TOKEN:
      return {...state, token: null};
    case ADD_USER:
      return {
        ...state,
        name: action.payload.name,
        type: action.payload.type,
        token: action.payload.jwt,
        email: action.payload.email,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
