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
  UPDATE_SELECTED_CANDIDATE,
  CANDIDATES_CLEANUP
} from '../../constants';

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
    //UPDATE ONE
    case UPDATE_SELECTED_CANDIDATE: {
      console.log(state.selectedElement);
      const newState = { ...state.selectedElement };
      if (action.payload.field === 'number' || action.payload.field === 'street') {
        if (!newState.address) newState.address = {};
        newState.address[action.payload.field] = action.payload.value;
      } else newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
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
  }
};

export default reducer;
