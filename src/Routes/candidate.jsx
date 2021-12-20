import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Home';
import CollegeEducation from 'Components/Candidate/Profile/CollegeEducation';
import CollegeEducationForm from 'Components/Candidate/Profile/CollegeEducation/Form';

const candidatesRoutes = [
  { name: 'candidates', path: '/admin/candidates' },
  { name: 'College Education & plus', path: '/candidate/profile/college-education' }
];

const CandidatesRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={candidatesRoutes} resource={'candidate'}>
      <Switch>
        <Route path={`${url}/home`} exact component={Home} />
        <Route path={`${url}/sign-up`} exact component={Home} />
        <Route path={`${url}/sign-up/step2`} exact component={Home} />
        <Route path={`${url}/profile/personal-information`} exact component={Home} />
        <Route path={`${url}/profile/basic-education`} exact component={Home} />
        <Route path={`${url}/profile/college-education`} exact component={CollegeEducation} />
        <Route
          path={`${url}/profile/college-education/form`}
          exact
          component={CollegeEducationForm}
        />
        <Route
          path={`${url}/profile/college-education/form/:id`}
          exact
          component={CollegeEducationForm}
        />
        <Route path={`${url}/profile/other-education`} exact component={Home} />
        <Route path={`${url}/profile/work-experience`} exact component={Home} />
        <Route path={`${url}/profile/hobbies`} exact component={Home} />
        <Route path={`${url}/profile/time-range`} exact component={Home} />
        <Route path={`${url}/profile/`}>
          <Redirect to={`${url}/profile/personal-information`} />
        </Route>
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default CandidatesRoutes;
