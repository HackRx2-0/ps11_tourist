import {ADD_USER} from '../Actions/types';

const initialState = {
  name: '',
  type: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        name: action.payload.name,
        type: action.payload.type,
      };
    default:
      return state;
  }
};

export default authReducer;
