import {
  GET_COMPANIES_FETCHING,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_REJECTED,
  DELETE_COMPANY_FETCHING,
  DELETE_COMPANY_FULFILLED,
  DELETE_COMPANY_REJECTED,
  CREATE_COMPANY_FETCHING,
  CREATE_COMPANY_FULFILLED,
  CREATE_COMPANY_REJECTED,
  UPDATE_COMPANY_FETCHING,
  UPDATE_COMPANY_FULFILLED,
  UPDATE_COMPANY_REJECTED,
  GET_COMPANY_FETCHING,
  GET_COMPANY_FULFILLED,
  GET_COMPANY_REJECTED,
  COMPANIES_CLEANUP
} from '../../constants';

//GET COMPANIES

export const getCompaniesFetching = () => ({
  type: GET_COMPANIES_FETCHING
});

export const getCompaniesFulfilled = (payload) => ({
  type: GET_COMPANIES_FULFILLED,
  payload
});

export const getCompaniesRejected = () => ({
  type: GET_COMPANIES_REJECTED
});

//DELETE COMPANY

export const deleteCompanyFetching = () => ({
  type: DELETE_COMPANY_FETCHING
});

export const deleteCompanyFulfilled = (payload) => ({
  type: DELETE_COMPANY_FULFILLED,
  payload
});

export const deleteCompanyRejected = () => ({
  type: DELETE_COMPANY_REJECTED
});

//CREATE COMPANIES

export const createCompanyFetching = () => ({
  type: CREATE_COMPANY_FETCHING
});

export const createCompanyFulfilled = (payload) => ({
  type: CREATE_COMPANY_FULFILLED,
  payload
});

export const createCompanyRejected = () => ({
  type: CREATE_COMPANY_REJECTED
});

//UPDATE COMPANY

export const updateCompanyFetching = () => ({
  type: UPDATE_COMPANY_FETCHING
});

export const updateCompanyFulfilled = (payload) => ({
  type: UPDATE_COMPANY_FULFILLED,
  payload
});

export const updateCompanyRejected = () => ({
  type: UPDATE_COMPANY_REJECTED
});

//GET ONE COMPANY
export const getCompanyFetching = () => ({
  type: GET_COMPANY_FETCHING
});

export const getCompanyFulfilled = (payload) => ({
  type: GET_COMPANY_FULFILLED,
  payload
});

export const getCompanyRejected = () => ({
  type: GET_COMPANY_REJECTED
});

// CLEANUP
export const companiesCleanup = () => {
  return {
    type: COMPANIES_CLEANUP
  };
};
