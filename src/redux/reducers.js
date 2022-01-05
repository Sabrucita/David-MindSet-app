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
import candidateProfileReducer from './candidate/profile/reducer';
import candidateSessionsReducer from './candidate/sessions/reducer';
//PSYCHOLOGIST
// import psychologistProfileReducer from './psychologist/profile/reducer';
// import psychologistCandidateReducer from './psychologist/session/reducer';
// import psychologistSessionsReducer from './psychologist/session/reducer';
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
  candidateProfile: candidateProfileReducer,
  candidateSessions: candidateSessionsReducer,
  //PSYCHOLOGIST
  // psychologistProfile: psychologistProfileReducer,
  // psychologistCandidate: psychologistCandidateReducer,
  // psychologistSessions: psychologistSessionsReducer,
  //SHARED
  modal: modalReducer,
  auth: authReducer
});

export default reducer;
