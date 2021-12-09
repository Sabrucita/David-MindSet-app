import applicationReducer from './applications/reducer';
import sessionsReducer from './sessions/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  sessions: sessionsReducer
});

export default reducer;
