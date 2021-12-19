import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Candidates from 'Components/Admin/Candidates';
import CandidatesForm from 'Components/Admin/Candidates/Form';
import Layout from 'Components/Layout';
import Home from 'Components/Home';

const adminsRoutes = [{ name: 'candidates', path: '/admin/candidates' }];

const CandidatesRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes} resource={'candidate'}>
      <Switch>
        <Route path={`${url}/home`} exact component={Home} />
        <Route path={`${url}/candidates`} exact component={Candidates} />
        <Route path={`${url}/candidates/form`} exact component={CandidatesForm} />
        <Route path={`${url}/candidates/form/:id`} component={CandidatesForm} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default CandidatesRoutes;
