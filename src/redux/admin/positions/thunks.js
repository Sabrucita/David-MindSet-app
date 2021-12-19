import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';
import {
  getPositionsFetching,
  getPositionsFulfilled,
  getPositionsRejected,
  getPositionFetching,
  getPositionFulfilled,
  getPositionRejected,
  getPositionsOptionsFulfilled,
  getPositionsOptionsRejected,
  getPositionsOptionsFetching,
  createPositionFetching,
  createPositionFulfilled,
  createPositionRejected,
  updatePositionFetching,
  updatePositionFulfilled,
  updatePositionRejected,
  deletePositionFetching,
  deletePositionFulfilled,
  deletePositionRejected
} from './actions';

export const getPositions = () => {
  return (dispatch) => {
    dispatch(getPositionsFetching());
    fetch(`${url}/open-positions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getPositionsFulfilled(data));
      })
      .catch((err) => {
        dispatch(getPositionsRejected());
        dispatch(showModal('positions', 'error', err.message));
      });
  };
};

export const getPosition = (id) => {
  return (dispatch) => {
    dispatch(getPositionFetching());
    fetch(`${url}/open-positions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const currentData = {
          idCompany: data.idCompany?._id,
          startDate: data.startDate?.substr(0, 10),
          endDate: data.endDate?.substr(0, 10),
          jobDescription: data.jobDescription
        };
        dispatch(getPositionFulfilled(currentData));
      })
      .catch((err) => {
        dispatch(getPositionRejected());
        dispatch(showModal('positions', 'error', err.message));
      });
  };
};

export const getPositionsOptions = (resource) => {
  return (dispatch) => {
    dispatch(getPositionsOptionsFetching());
    fetch(`${url}/${resource}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(getPositionsOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        dispatch(getPositionsOptionsRejected(data));
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(getPositionsOptionsRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

export const createPosition = (session) => {
  return (dispatch) => {
    dispatch(createPositionFetching());
    dispatch(showModal('positions', 'fetching'));
    fetch(`${url}/open-positions`, {
      method: 'POST',
      body: JSON.stringify(session),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createPositionFulfilled(data));
          return dispatch(updateModal('create', data.data));
        }
        const data = await res.json();
        dispatch(createPositionRejected(data));
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(createPositionRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

export const updatePosition = (id, session) => {
  return (dispatch) => {
    dispatch(updatePositionFetching());
    dispatch(showModal('positions', 'fetching'));
    fetch(`${url}/open-positions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(session),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updatePositionFulfilled(data));
          return dispatch(updateModal('update', data.data));
        }
        const data = await res.json();
        dispatch(updatePositionRejected(data));
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(updatePositionRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

export const deletePosition = (id) => {
  return (dispatch) => {
    dispatch(deletePositionFetching());
    dispatch(updateModal('fetching'));
    fetch(`${url}/open-positions/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deletePositionFulfilled(data));
          return dispatch(updateModal('deleted', data.data));
        }
        const data = await res.json();
        dispatch(updatePositionRejected(data));
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(deletePositionRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};
