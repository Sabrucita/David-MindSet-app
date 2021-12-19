import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
const AdminRoutes = lazy(() => import('Routes/admin'));
const CandidateRoutes = lazy(() => import('Routes/candidate'));
const PublicRoutes = lazy(() => import('Routes/public'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/home" component={PublicRoutes} />
          <Route path="/candidate" component={CandidateRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Redirect to="/home" />
        </Switch>
      </Suspense>
    </Router>
  );
};
export default Routes;
