import { url } from '../../constants/index';
import { showModal } from '../modal/actions';

import {
  getCompaniesFetching,
  getCompaniesFulfilled,
  getCompaniesRejected,
  deleteCompanyFetching,
  deleteCompanyFulfilled,
  deleteCompanyRejected
} from './actions';

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

export const deleteCompany = (id) => {
  return (dispatch) => {
    dispatch(deleteCompanyFetching());
    dispatch(showModal('fetching', 'Deleting Company', { info: 'Loading...' }));
    fetch(`${url}/companies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deleteCompanyFulfilled(data));
          dispatch(showModal('create', 'Company Deleted', data.data));
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      })
      .catch((err) => {
        dispatch(deleteCompanyRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};
