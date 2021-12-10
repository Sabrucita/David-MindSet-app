import applicationReducer from './applications/reducer';
import candidatesReducer from './candidates/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  candidates: candidatesReducer
});

export default reducer;
