import {combineReducers} from 'redux';

import authReducer from './authReducer';
import realtimeReducer from './realtimeReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  realtime: realtimeReducer,
});

export default rootReducer;
