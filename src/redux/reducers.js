import applicationReducer from './applications/reducer';
import companiesReducer from './companies/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  companies: companiesReducer
});

export default reducer;
