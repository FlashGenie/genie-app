import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';

export default combineReducers({
  session: sessionErrorsReducer
});