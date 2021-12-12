import applicationReducer from './applications/reducer';
import psychologistsReducer from './psychologists/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  psychologists: psychologistsReducer,
  modal: modalReducer
});

export default reducer;
