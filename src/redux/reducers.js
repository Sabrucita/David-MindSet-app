import applicationReducer from './applications/reducer';
import profileReducer from './profiles/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  profile: profileReducer,
  modal: modalReducer
});

export default reducer;
