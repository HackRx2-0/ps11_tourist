import {CHECK_TOKEN, SET_TOKEN} from '../Actions/types';

const initialState = {
  token: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload};
    default:
      return state;
  }
};

export default authReducer;
