import applicationReducer from './applications/reducer';
import interviewReducer from './interviews/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  applications: applicationReducer,
  interviews: interviewReducer,
  modal: modalReducer
});

export default reducer;
