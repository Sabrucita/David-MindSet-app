import {
  GET_AVAILABLE_DATES_FETCHING,
  GET_AVAILABLE_DATES_FULFILLED,
  GET_AVAILABLE_DATES_REJECTED,
  SET_SELECTED_SESSION,
  CREATE_SESSION_FETCHING,
  CREATE_SESSION_FULFILLED,
  CREATE_SESSION_REJECTED
} from 'constants/candidate/index';

const initialState = {
  isFetching: false,
  list: [],
  currentWeek: [],
  selectedSession: {},
  error: { error: false, msg: '' }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //GET AVAILABLE DATES
    case GET_AVAILABLE_DATES_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: false
      };
    }
    case GET_AVAILABLE_DATES_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        list: action.payload.availableDates,
        currentWeek: action.payload.currentWeek
      };
    }
    case GET_AVAILABLE_DATES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: true
      };
    }
    //SET SELECTED SESSION
    case SET_SELECTED_SESSION: {
      return {
        ...state,
        selectedSession: action.payload
      };
    }
    //CREATE SESSION
    case CREATE_SESSION_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: false
      };
    }
    case CREATE_SESSION_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        selectedSession: initialState.selectedSession
      };
    }
    case CREATE_SESSION_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: true
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
