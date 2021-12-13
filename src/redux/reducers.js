import applicationReducer from './applications/reducer';
import positionsReducer from './positions/reducer';
import modalReducer from './modal/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  application: applicationReducer,
  positions: positionsReducer,
  modal: modalReducer
});

export default reducer;
