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
  UPDATE_SELECTED_APPLICATION,
  CLEAN_SELECTED_ELEMENT
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  selectedElement: {},
  error: { error: false, msg: '' }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
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
    case GET_CANDIDATE_BY_ID_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_CANDIDATE_BY_ID_FULLFILLED: {
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    }
    case GET_CANDIDATE_BY_ID_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CREATE_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case CREATE_CANDIDATES_FULLFILLED: {
      return {
        ...state,
        isFetching: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_CANDIDATES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case UPDATE_SELECTED_APPLICATION: {
      const newState = { ...state.selectedElement };
      newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
      };
    }
    case CLEAN_SELECTED_ELEMENT:
      return { ...state, selectedElement: '' };
    case UPDATE_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case UPDATE_CANDIDATES_FULLFILLED: {
      return {
        ...state,
        isFetching: false,
        list: state.list.map((item) => {
          if (item.id === action.payload._id) {
            return action.payload;
          }
          return item;
        })
      };
    }
    case UPDATE_CANDIDATES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        eeror: action.payload
      };
    }
    case DELETE_CANDIDATES_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case DELETE_CANDIDATES_FULLFILLED: {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload)
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
