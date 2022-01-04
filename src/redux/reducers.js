//ADMIN
import applicationReducer from './admin/applications/reducer';
import profileReducer from './admin/profiles/reducer';
import psychologistsReducer from './admin/psychologists/reducer';
import candidatesReducer from './admin/candidates/reducer';
import adminsReducer from './admin/admins/reducer';
import positionsReducer from './admin/positions/reducer';
import sessionsReducer from './admin/sessions/reducer';
import interviewReducer from './admin/interviews/reducer';
import companiesReducer from './admin/companies/reducer';
//CANDIDATE
import candidateSessionsReducer from './candidate/sessions/reducer';
//SHARED
import authReducer from './auth/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  //ADMIN
  profiles: profileReducer,
  psychologists: psychologistsReducer,
  candidates: candidatesReducer,
  admins: adminsReducer,
  applications: applicationReducer,
  positions: positionsReducer,
  sessions: sessionsReducer,
  interviews: interviewReducer,
  companies: companiesReducer,
  //CANDIDATE
  candidateSessions: candidateSessionsReducer,
  //SHARED
  modal: modalReducer,
  auth: authReducer
});

export default reducer;
