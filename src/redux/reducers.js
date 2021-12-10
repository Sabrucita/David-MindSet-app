import applicationReducer from './applications/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  applications: applicationReducer,
  modal: modalReducer
});

export default reducer;
