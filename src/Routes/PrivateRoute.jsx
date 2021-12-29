import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setAuthentication } from 'redux/auth/actions';
import { fetchLogin } from 'redux/auth/thunks';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(setAuthentication());
      dispatch(fetchLogin());
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        sessionStorage.getItem('token') ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;
