import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { tokenListener } from 'helpers/firebase';

const PublicRoutes = lazy(() => import('Routes/public'));
const CandidateRoutes = lazy(() => import('Routes/candidate'));
const AdminRoutes = lazy(() => import('Routes/admin'));
const PsychologistRoutes = lazy(() => import('Routes/psychologist'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/home" component={PublicRoutes} />
          <Route path="/candidate" component={CandidateRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/psychologist" component={PsychologistRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/home" />
        </Switch>
      </Suspense>
    </Router>
  );
};
export default Routes;
