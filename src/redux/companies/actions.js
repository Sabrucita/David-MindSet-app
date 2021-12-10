import {
  GET_COMPANIES_FETCHING,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_REJECTED
} from '../../constants';

//GET COMPANIES

export const getCompaniesFetching = () => ({
  type: GET_COMPANIES_FETCHING
});

export const getCompaniesFulfilled = (payload) => ({
  type: GET_COMPANIES_FULFILLED,
  payload
});

export const getCompaniesRejected = (payload) => ({
  type: GET_COMPANIES_REJECTED,
  payload
});
