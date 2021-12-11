import applicationReducer from './applications/reducer';
import adminsReducer from './admins/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  admins: adminsReducer,
  modal: modalReducer
});

export default reducer;
