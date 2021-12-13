import { capitalize } from '../../Components/helpers';
import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  GET_POSITION_FETCHING,
  GET_POSITION_FULFILLED,
  GET_POSITION_REJECTED,
  UPDATE_SELECTED_POSITION,
  GET_POSITIONS_OPTIONS_FETCHING,
  GET_POSITIONS_OPTIONS_FULFILLED,
  GET_POSITIONS_OPTIONS_REJECTED,
  CREATE_POSITION_FETCHING,
  CREATE_POSITION_FULFILLED,
  CREATE_POSITION_REJECTED,
  UPDATE_POSITION_FETCHING,
  UPDATE_POSITION_FULFILLED,
  UPDATE_POSITION_REJECTED,
  DELETE_POSITION_FETCHING,
  DELETE_POSITION_FULFILLED,
  DELETE_POSITION_REJECTED,
  POSITIONS_CLEANUP,
  GET_SELECTED_POSITION
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  selectedElement: {
    idCompany: '',
    startDate: '',
    endDate: '',
    jobDescription: ''
  },
  options: { companies: [] },
  error: false
};

const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET POSITIONS
    case GET_POSITIONS_FETCHING:
      return {
        ...state,
        isFetching: true,
        selectedElement: {},
        error: false
      };
    case GET_POSITIONS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_POSITIONS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // GET POSITION
    case GET_POSITION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_POSITION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_POSITION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // SELECTED POSITION
    case GET_SELECTED_POSITION: {
      return {
        ...state,
        selectedElement: action.payload
      };
    }
    case UPDATE_SELECTED_POSITION: {
      const newState = { ...state.selectedElement };
      newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
      };
    }

    // POSITIONS CLEANUP
    case POSITIONS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {
          idCompany: '',
          startDate: '',
          endDate: '',
          jobDescription: ''
        },
        error: false
      };

    // GET OPTIONS
    case GET_POSITIONS_OPTIONS_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case GET_POSITIONS_OPTIONS_FULFILLED: {
      const newOptions = action.payload.map((element) => {
        const value = element.name;
        return {
          id: element._id,
          name: capitalize(value)
        };
      });
      const options = { ...state.options };
      options[action.resource] = newOptions;
      return {
        ...state,
        options
      };
    }
    case GET_POSITIONS_OPTIONS_REJECTED:
      return {
        ...state,
        error: true
      };

    // CREATE POSITION
    case CREATE_POSITION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_POSITION_FULFILLED:
      return {
        ...state,
        isFetching: false
      };
    case CREATE_POSITION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // UPDATE POSITION
    case UPDATE_POSITION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_POSITION_FULFILLED:
      return {
        ...state,
        isFetching: false
      };
    case UPDATE_POSITION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // DELETE POSITION
    case DELETE_POSITION_FETCHING:
      return {
        ...state,
        error: false
      };
    case DELETE_POSITION_FULFILLED:
      return {
        ...state,
        list: state.list.filter((position) => position._id !== action.payload.data._id)
      };
    case DELETE_POSITION_REJECTED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default positionsReducer;
