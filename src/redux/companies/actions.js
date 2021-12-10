import {
  GET_COMPANIES_FETCHING,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_REJECTED,
  DELETE_COMPANY_FETCHING,
  DELETE_COMPANY_FULFILLED,
  DELETE_COMPANY_REJECTED
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
  //por qué payload y no por ejemplo error
  type: GET_COMPANIES_REJECTED,
  payload
});

//DELETE COMPANY

export const deleteCompanyFetching = () => ({
  type: DELETE_COMPANY_FETCHING
});

export const deleteCompanyFulfilled = (payload) => ({
  type: DELETE_COMPANY_FULFILLED,
  payload
});

export const deleteCompanyRejected = (payload) => ({
  type: DELETE_COMPANY_REJECTED,
  payload
});
