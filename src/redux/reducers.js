import applicationReducer from './applications/reducer';
import adminsReducer from './admins/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  admins: adminsReducer
});

export default reducer;
