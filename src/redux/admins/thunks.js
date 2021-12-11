import { url } from '../../constants';
import { showModal } from '../modal/actions';

import {
  getAdminsFetching,
  getAdminsFulfilled,
  getAdminsRejected,
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    fetch(`${url}/administrators`)
      .then((data) => data.json())
      .then((res) => {
        dispatch(getAdminsFulfilled(res));
      })
      .catch((err) => {
        dispatch(getAdminsRejected(err));
      });
  };
};
