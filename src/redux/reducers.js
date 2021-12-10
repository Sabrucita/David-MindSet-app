import applicationReducer from './applications/reducer';
import sessionsReducer from './sessions/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  sessions: sessionsReducer,
  modal: modalReducer
});

export default reducer;
