import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';
import {
  getAvailableDatesFetching,
  getAvailableDatesFulfilled,
  getAvailableDatesRejected
} from './actions';

export const getAvailableDates = () => {
  return (dispatch) => {
    dispatch(getAvailableDatesFetching());
    fetch(`${url}/candidate/sessions/availableDates`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          return dispatch(getAvailableDatesFulfilled(data));
        }
      })
      .catch(() => {
        dispatch(getAvailableDatesRejected());
      });
  };
};
