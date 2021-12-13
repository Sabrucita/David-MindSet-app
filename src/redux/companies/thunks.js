import { url } from '../../constants/index';
import { showModal, updateModal } from '../modal/actions';

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
        const error = { error: true, msg: err };
        dispatch(getCompanyRejected(error));
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
        const error = { error: true, msg: err };
        dispatch(getCompaniesRejected(error));
      });
  };
};

//DELETE COMPANY

export const deleteCompany = (id) => {
  return (dispatch) => {
    dispatch(deleteCompanyFetching());
    dispatch(updateModal('deleting'));
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
        dispatch(updateModal('error', data));
      })
      .catch((err) => {
        const error = { error: true, msg: err.message };
        dispatch(deleteCompanyRejected(error));
        dispatch(showModal('companies', 'error', err.message));
      });
  };
};

//CREATE COMPANY

export const createCompany = (company) => {
  return (dispatch) => {
    dispatch(createCompanyFetching());
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
      })
      .catch((err) => {
        console.log('hola');
        const error = { error: true, msg: err };
        dispatch(createCompanyRejected(error));
        dispatch(showModal('companies', 'error', err.message));
      });
  };
};

//UPDATE COMPANY

export const updateCompany = (id, company) => {
  return (dispatch) => {
    dispatch(updateCompanyFetching());
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
      })
      .catch((err) => {
        const error = { error: true, msg: err };
        dispatch(updateCompanyRejected(error));
        dispatch(showModal('companies', 'error', err.message));
      });
  };
};
