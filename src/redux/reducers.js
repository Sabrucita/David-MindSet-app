import applicationReducer from './applications/reducer';
import interviewReducer from './interviews/reducer';
import companiesReducer from './companies/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  applications: applicationReducer,
  interviews: interviewReducer,
  companies: companiesReducer,
  modal: modalReducer
});

export default reducer;
