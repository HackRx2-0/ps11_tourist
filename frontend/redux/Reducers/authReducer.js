import { REMOVE_TOKEN, SET_TOKEN } from '../Actions/types';

const initialState = {
  token: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case REMOVE_TOKEN:
      return { ...state, token: null };
    default:
      return state;
  }
};

export default authReducer;
