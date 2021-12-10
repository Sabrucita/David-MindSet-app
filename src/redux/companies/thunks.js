import { url } from '../../constants/index';

import { getCompaniesFetching, getCompaniesFulfilled, getCompaniesRejected } from './actions';

export const getCompanies = () => {
  return (dispatch) => {
    dispatch(getCompaniesFetching());
    fetch(`${url}/companies`)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getCompaniesFulfilled(response));
      })
      .catch((err) => {
        dispatch(getCompaniesRejected(err));
      });
  };
};
