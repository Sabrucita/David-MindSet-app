import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Home';

import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from 'Components/shared/Sidebar';
import styles from './routes.module.css';

const psychologistRoutes = [{ name: 'Home', path: '/psychologist' }];

const PsychologistRoutes = () => {
  const role = useSelector((store) => store.auth.role);
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (role !== 'psychologist') {
      history.goBack();
    }
  }, []);

  return (
    <Layout routes={psychologistRoutes} resource={'psychologist'}>
      <div className={styles.bodyContainer}>
        <Sidebar />
        <Switch>
          <PrivateRoute path={`${url}/home`} exact component={Home} />
          <Redirect to={`${url}/home`} />
        </Switch>
      </div>
    </Layout>
  );
};

export default PsychologistRoutes;
