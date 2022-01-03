import {
  GET_CANDIDATES_FETCHING,
  GET_CANDIDATES_FULLFILLED,
  GET_CANDIDATES_REJECTED,
  GET_CANDIDATE_BY_ID_FETCHING,
  GET_CANDIDATE_BY_ID_FULLFILLED,
  GET_CANDIDATE_BY_ID_REJECTED,
  CREATE_CANDIDATES_FETCHING,
  CREATE_CANDIDATES_FULLFILLED,
  CREATE_CANDIDATES_REJECTED,
  UPDATE_CANDIDATES_FETCHING,
  UPDATE_CANDIDATES_FULLFILLED,
  UPDATE_CANDIDATES_REJECTED,
  DELETE_CANDIDATES_FETCHING,
  DELETE_CANDIDATES_FULLFILLED,
  DELETE_CANDIDATES_REJECTED,
  GET_INTERVIEW_FETCHING,
  GET_INTERVIEW_FULFILLED,
  GET_INTERVIEW_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  INTERVIEWS_CLEANUP,
  CANDIDATES_CLEANUP
} from 'constants/index';

const initialState = {
  isFetching: false,
  isFetchingDelete: false,
  list: [],
  selectedElement: {},
  error: { error: false, msg: '' }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //GET ALL CANDIDATES
    case GET_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case GET_CANDIDATES_FULLFILLED: {
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    }
    case GET_CANDIDATES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    }
    //GET CANDIDATE BY ID
    case GET_CANDIDATE_BY_ID_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: { error: false, msg: '' }
      };
    }
    case GET_CANDIDATE_BY_ID_FULLFILLED: {
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    }
    case GET_CANDIDATE_BY_ID_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    // CREATE A CANDIDATE
    case CREATE_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case CREATE_CANDIDATES_FULLFILLED: {
      return {
        ...state,
        isFetching: false
      };
    }
    case CREATE_CANDIDATES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    }

    //CLEAN UP
    case CANDIDATES_CLEANUP:
      return { ...state, selectedElement: '' };
    //UPDATE CANDIDATES
    case UPDATE_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case UPDATE_CANDIDATES_FULLFILLED: {
      return {
        ...state,
        isFetching: false
      };
    }
    case UPDATE_CANDIDATES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    }
    //DELETE CANDIDATE
    case DELETE_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case DELETE_CANDIDATES_FULLFILLED: {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    }
    case DELETE_CANDIDATES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    }
    default: {
      return state;
    }
    //GET 1
    case GET_INTERVIEW_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_INTERVIEW_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_INTERVIEW_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    // CLEAN UP
    case INTERVIEWS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };
    //DELETE
    case DELETE_INTERVIEW_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case DELETE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_INTERVIEW_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
  }
};

export default reducer;
