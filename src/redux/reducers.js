import applicationReducer from './applications/reducer';
import positionsReducer from './positions/reducer';
import sessionsReducer from './sessions/reducer';
import interviewReducer from './interviews/reducer';
import companiesReducer from './companies/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  positions: positionsReducer,
  sessions: sessionsReducer,
  interviews: interviewReducer,
  companies: companiesReducer,
  modal: modalReducer
});

export default reducer;
