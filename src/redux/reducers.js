import applicationReducer from './applications/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  applications: applicationReducer
});

export default reducer;
