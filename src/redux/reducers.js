import applicationReducer from './applications/reducer';
import companiesReducer from './companies/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  companies: companiesReducer,
  modal: modalReducer
});

export default reducer;
