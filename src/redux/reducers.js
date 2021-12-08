import applicationReducer from './applications/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer
});

export default reducer;
