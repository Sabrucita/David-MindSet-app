import applicationReducer from './applications/reducer';
import profileReducer from './profiles/reducer';
import psychologistsReducer from './psychologists/reducer';
import candidatesReducer from './candidates/reducer';
import adminsReducer from './admins/reducer';
import positionsReducer from './positions/reducer';
import sessionsReducer from './sessions/reducer';
import interviewReducer from './interviews/reducer';
import companiesReducer from './companies/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  profiles: profileReducer,
  psychologists: psychologistsReducer,
  candidates: candidatesReducer,
  admins: adminsReducer,
  applications: applicationReducer,
  positions: positionsReducer,
  sessions: sessionsReducer,
  interviews: interviewReducer,
  companies: companiesReducer,
  modal: modalReducer
});

export default reducer;
