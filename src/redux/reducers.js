import applicationReducer from './applications/reducer';
import candidatesReducer from './candidates/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  candidates: candidatesReducer,
  modal: modalReducer
});

export default reducer;
