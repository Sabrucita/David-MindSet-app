import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';

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

//GET ONE COMPAY

export const getCompany = (id) => {
  return (dispatch) => {
    dispatch(getCompanyFetching());
    fetch(`${url}/companies/${id}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
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
          return dispatch(getCompanyFulfilled(currentData));
        }
      })
      .catch((err) => {
        dispatch(getCompanyRejected(err));
      });
  };
};

//GET COMPANIES
export const getCompanies = () => {
  return (dispatch) => {
    dispatch(getCompaniesFetching());
    fetch(`${url}/companies`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getCompaniesFulfilled(data));
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
    dispatch(showModal('companies', 'fetching'));
    fetch(`${url}/companies/${id}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deleteCompanyFulfilled(data));
          return dispatch(updateModal('deleted', data.data));
        }
        const data = await response.json();
        dispatch(updateCompanyRejected(data));
      })
      .catch((err) => {
        dispatch(deleteCompanyRejected(err));
        dispatch(showModal('companies', 'error', err.message));
      });
  };
};

//CREATE COMPANY

export const createCompany = (company) => {
  return (dispatch) => {
    dispatch(createCompanyFetching());
    dispatch(showModal('companies', 'fetching'));
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
          dispatch(createCompanyFulfilled(data));
          return dispatch(showModal('companies', 'create', data.data));
        }
        const data = await res.json();
        dispatch(createCompanyRejected(data));
        dispatch(showModal('companies', 'error', data.message));
      })
      .catch((err) => {
        dispatch(createCompanyRejected(err));
        dispatch(showModal('companies', 'error', err.message));
      });
  };
};

//UPDATE COMPANY

export const updateCompany = (id, company) => {
  return (dispatch) => {
    dispatch(updateCompanyFetching());
    dispatch(showModal('companies', 'fetching'));
    fetch(`${url}/companies/${id}`, {
      method: 'PUT',
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
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCompanyFulfilled(data));
          return dispatch(showModal('companies', 'update', data.data));
        }
        const data = await res.json();
        dispatch(updateCompanyRejected(data));
        dispatch(showModal('companies', 'error', data.message));
      })
      .catch((err) => {
        dispatch(updateCompanyRejected(err));
        dispatch(showModal('companies', 'error', err.message));
      });
  };
};
