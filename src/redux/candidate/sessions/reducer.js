import {
  GET_AVAILABLE_DATES_FETCHING,
  GET_AVAILABLE_DATES_FULFILLED,
  GET_AVAILABLE_DATES_REJECTED,
  SET_SELECTED_SESSION,
  CREATE_SESSION_FETCHING,
  CREATE_SESSION_FULFILLED,
  CREATE_SESSION_REJECTED,
  UPDATE_SESSION_FETCHING,
  UPDATE_SESSION_FULFILLED,
  UPDATE_SESSION_REJECTED,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED,
  GET_SESSION_FETCHING,
  GET_SESSION_FULFILLED,
  GET_SESSION_REJECTED
} from 'constants/candidate/index';

const initialState = {
  isFetching: false,
  list: [],
  currentWeek: [],
  selectedSession: {},
  scheduledSession: {},
  error: { error: false, msg: '' }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //GET AVAILABLE DATES
    case GET_AVAILABLE_DATES_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_AVAILABLE_DATES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload.availableDates,
        currentWeek: action.payload.currentWeek
      };
    case GET_AVAILABLE_DATES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //SET SELECTED SESSION
    case SET_SELECTED_SESSION:
      return {
        ...state,
        selectedSession: action.payload
      };
    //CREATE SESSION
    case CREATE_SESSION_FETCHING:
      return {
        ...state,
        error: false
      };
    case CREATE_SESSION_FULFILLED: {
      const newList = state.list.map((psychologist) => {
        if (psychologist.id !== action.payload.data.idPsychologist) return psychologist;
        psychologist.availability = psychologist.availability.map((day) => {
          if (day.day === action.payload.day.day || day.number === action.payload.day.number)
            day.hours = day.hours.filter((hour) => hour !== action.payload.data.time);
          return day;
        });
        return psychologist;
      });
      return {
        ...state,
        list: newList,
        selectedSession: initialState.selectedSession
      };
    }
    case CREATE_SESSION_REJECTED:
      return {
        ...state,
        error: true
      };
    //UPDATE SESSION
    case UPDATE_SESSION_FETCHING:
      return {
        ...state,
        error: false
      };
    case UPDATE_SESSION_FULFILLED:
      return {
        ...state,
        selectedSession: initialState.selectedSession
      };
    case UPDATE_SESSION_REJECTED:
      return {
        ...state,
        error: true
      };
    //DELETE SESSION
    case DELETE_SESSION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case DELETE_SESSION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        scheduledSession: initialState.scheduledSession
      };
    case DELETE_SESSION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //GET SESSION
    case GET_SESSION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_SESSION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        scheduledSession: action.payload
      };
    case GET_SESSION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
