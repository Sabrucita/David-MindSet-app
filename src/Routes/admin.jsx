import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
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
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes} resource={'admin'}>
      <Switch>
        <Route path={`${url}/home`} exact component={Home} />
        <Route path={`${url}/admins`} exact component={Admins} />
        <Route path={`${url}/admins/form`} exact component={AdminsForm} />
        <Route path={`${url}/admins/form/:id`} component={AdminsForm} />
        <Route path={`${url}/applications`} exact component={Applications} />
        <Route path={`${url}/applications/form`} exact component={ApplicationsForm} />
        <Route path={`${url}/applications/form/:id`} component={ApplicationsForm} />
        <Route path={`${url}/companies`} exact component={Companies} />
        <Route path={`${url}/companies/form`} exact component={CompaniesForm} />
        <Route path={`${url}/companies/form/:id`} component={CompaniesForm} />
        <Route path={`${url}/interviews`} exact component={Interviews} />
        <Route path={`${url}/interviews/form`} exact component={InterviewsForm} />
        <Route path={`${url}/interviews/form/:id`} component={InterviewsForm} />
        <Route path={`${url}/positions`} exact component={Positions} />
        <Route path={`${url}/positions/form`} exact component={PositionsForm} />
        <Route path={`${url}/positions/form/:id`} component={PositionsForm} />
        <Route path={`${url}/candidates`} exact component={Candidates} />
        <Route path={`${url}/candidates/form`} exact component={CandidatesForm} />
        <Route path={`${url}/candidates/form/:id`} component={CandidatesForm} />
        <Route path={`${url}/profiles`} exact component={Profiles} />
        <Route path={`${url}/profiles/form`} exact component={ProfilesForm} />
        <Route path={`${url}/profiles/form/:id`} component={ProfilesForm} />
        <Route path={`${url}/psychologists`} exact component={Psychologists} />
        <Route path={`${url}/psychologists/form`} exact component={PsychologistsForm} />
        <Route path={`${url}/psychologists/form/:id`} component={PsychologistsForm} />
        <Route path={`${url}/sessions`} exact component={Sessions} />
        <Route path={`${url}/sessions/form`} exact component={SessionsForm} />
        <Route path={`${url}/sessions/form/:id`} component={SessionsForm} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
