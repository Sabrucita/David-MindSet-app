import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Admins from 'Components/Admin/Admins';
import AdminsForm from 'Components/Admin/Admins/Form';
import Applications from 'Components/Admin/Applications';
import ApplicationsForm from 'Components/Admin/Applications/Form';
import Companies from 'Components/Admin/Companies';
import CompaniesForm from 'Components/Admin/Companies/Form';
import Interviews from 'Components/Admin/Interviews';
import InterviewsForm from 'Components/Admin/Interviews/Form';
import Positions from 'Components/Admin/Positions';
import PositionsForm from 'Components/Admin/Positions/Form';
import Candidates from 'Components/Admin/Candidates';
import CandidatesForm from 'Components/Admin/Candidates/Form';
import Profiles from 'Components/Admin/Profiles';
import ProfilesForm from 'Components/Admin/Profiles/Form';
import Psychologists from 'Components/Admin/Psychologists';
import PsychologistsForm from 'Components/Admin/Psychologists/Form';
import Sessions from 'Components/Admin/Sessions';
import SessionsForm from 'Components/Admin/Sessions/Form';
import Layout from 'Components/Layout';
import Home from 'Components/Home';
import PrivateRoute from 'Routes/PrivateRoute';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from 'Components/shared/Sidebar';
import styles from './routes.module.css';

const adminsRoutes = [
  { name: 'admins', path: '/admin/admins' },
  { name: 'applications', path: '/admin/applications' },
  { name: 'companies', path: '/admin/companies' },
  { name: 'interviews', path: '/admin/interviews' },
  { name: 'positions', path: '/admin/positions' },
  { name: 'candidates', path: '/admin/candidates' },
  { name: 'profiles', path: '/admin/profiles' },
  { name: 'psychologists', path: '/admin/psychologists' },
  { name: 'sessions', path: '/admin/sessions' }
];

const AdminRoutes = () => {
  const role = useSelector((store) => store.auth.role);
  const history = useHistory();
  useEffect(() => {
    if (role !== 'admin') {
      history.goBack();
    }
  }, []);

  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes} resource={'admin'}>
      <div className={styles.bodyContainer}>
        <Sidebar />
        <Switch>
          <PrivateRoute path={`${url}/home`} exact component={Home} />
          <PrivateRoute path={`${url}/admins`} exact component={Admins} />
          <PrivateRoute path={`${url}/admins/form/:id`} component={AdminsForm} />
          <PrivateRoute path={`${url}/applications`} exact component={Applications} />
          <PrivateRoute path={`${url}/applications/form`} exact component={ApplicationsForm} />
          <PrivateRoute path={`${url}/applications/form/:id`} component={ApplicationsForm} />
          <PrivateRoute path={`${url}/companies`} exact component={Companies} />
          <PrivateRoute path={`${url}/companies/form`} exact component={CompaniesForm} />
          <PrivateRoute path={`${url}/companies/form/:id`} component={CompaniesForm} />
          <PrivateRoute path={`${url}/interviews`} exact component={Interviews} />
          <PrivateRoute path={`${url}/interviews/form`} exact component={InterviewsForm} />
          <PrivateRoute path={`${url}/interviews/form/:id`} component={InterviewsForm} />
          <PrivateRoute path={`${url}/positions`} exact component={Positions} />
          <PrivateRoute path={`${url}/positions/form`} exact component={PositionsForm} />
          <PrivateRoute path={`${url}/positions/form/:id`} component={PositionsForm} />
          <PrivateRoute path={`${url}/candidates`} exact component={Candidates} />
          <PrivateRoute path={`${url}/candidates/form`} exact component={CandidatesForm} />
          <PrivateRoute path={`${url}/candidates/form/:id`} component={CandidatesForm} />
          <PrivateRoute path={`${url}/profiles`} exact component={Profiles} />
          <PrivateRoute path={`${url}/profiles/form`} exact component={ProfilesForm} />
          <PrivateRoute path={`${url}/profiles/form/:id`} component={ProfilesForm} />
          <PrivateRoute path={`${url}/psychologists`} exact component={Psychologists} />
          <PrivateRoute path={`${url}/psychologists/form`} exact component={PsychologistsForm} />
          <PrivateRoute path={`${url}/psychologists/form/:id`} component={PsychologistsForm} />
          <PrivateRoute path={`${url}/sessions`} exact component={Sessions} />
          <PrivateRoute path={`${url}/sessions/form`} exact component={SessionsForm} />
          <PrivateRoute path={`${url}/sessions/form/:id`} component={SessionsForm} />
          <Redirect to={`${url}/home`} />
        </Switch>
      </div>
    </Layout>
  );
};

export default AdminRoutes;
