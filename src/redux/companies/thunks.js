import { url } from '../../constants/index';
import { showModal } from '../modal/actions';

import {
  getCompaniesFetching,
  getCompaniesFulfilled,
  getCompaniesRejected,
  deleteCompanyFetching,
  deleteCompanyFulfilled,
  deleteCompanyRejected,
  createCompanyFetching,
  createCompanyFulfilled,
  createCompanyRejected,
  getCompanyFetching,
  getCompanyFulfilled,
  getCompanyRejected,
  updateCompanyFetching,
  updateCompanyFulfilled,
  updateCompanyRejected
} from './actions';

//GET COMPANIES

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

//DELETE COMPANY

export const deleteCompany = (id) => {
  return (dispatch) => {
    dispatch(deleteCompanyFetching());
    dispatch(showModal('fetching', 'Deleting Company', { info: 'Loading...' }));
    fetch(`${url}/companies/${id}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deleteCompanyFulfilled(data));
          dispatch(showModal('create', 'Company Deleted', data.data));
        } else {
          throw new Error(`HTTP ${response.msg}`);
        }
      })
      .catch((err) => {
        dispatch(deleteCompanyRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};

//GET ONE COMPAY

export const getCompany = (id) => {
  return (dispatch) => {
    dispatch(getCompanyFetching());
    fetch(`${url}/companies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const currentData = {
          name: data.name,
          address: data.address,
          city: data.city,
          province: data.province,
          country: data.country,
          zipCode: parseInt(data.zipCode),
          phone: parseInt(data.phone),
          email: data.email,
          pictureUrl: data.pictureUrl,
          contactFullName: data.contactFullName,
          contactPhone: parseInt(data.contactPhone),
          isActive: data.isActive
        };
        dispatch(getCompanyFulfilled(currentData));
      })
      .catch((err) => {
        dispatch(getCompanyRejected(err));
      });
  };
};

//CREATE COMPANY

export const createCompany = (company) => {
  return (dispatch) => {
    dispatch(createCompanyFetching());
    dispatch(showModal('fetching', 'Creating Company', { info: 'Loading...' }));
    fetch(`${url}/companies`, {
      method: 'POST',
      body: JSON.stringify({
        name: company.name,
        address: company.address,
        city: company.city,
        province: company.province,
        country: company.country,
        zipCode: parseInt(company.zipCode),
        phone: parseInt(company.phone),
        email: company.email,
        pictureUrl: company.pictureUrl,
        contactFullName: company.contactFullName,
        contactPhone: parseInt(company.contactPhone),
        isActive: company.isActive
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          console.log(data);
          dispatch(createCompanyFulfilled(data));
          return dispatch(showModal('create', 'Company Created', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        dispatch(createCompanyRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};

//UPDATE COMPANY

export const updateCompany = (id, obj) => {
  return (dispatch) => {
    dispatch(updateCompanyFetching());
    dispatch(showModal('fetching', 'Updating Company', { info: 'Loading...' }));
    fetch(`${url}/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCompanyFulfilled(data));
          return dispatch(showModal('update', 'Company Updated', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(updateCompanyRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};
