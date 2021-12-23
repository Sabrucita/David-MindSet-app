import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Home';
import BasicEducation from 'Components/Candidate/Profile/BasicEducation';
import BasicEducationForm from 'Components/Candidate/Profile/BasicEducation/Form';
import PersonalInformationList from 'Components/Candidate/Profile/PersonalInformation';
import PersonalInformationForm from 'Components/Candidate/Profile/PersonalInformation/Form';
import CollegeEducation from 'Components/Candidate/Profile/CollegeEducation';
import CollegeEducationForm from 'Components/Candidate/Profile/CollegeEducation/Form';
import WorkExperience from 'Components/Candidate/Profile/WorkExperience';
import WorkExperienceForm from 'Components/Candidate/Profile/WorkExperience/Form';
import PrivateRoute from './PrivateRoute';

const candidatesRoutes = [
  { name: 'home', path: '/candidate' },
  { name: 'personal information', path: '/candidate/profile/personal-information' },
  { name: 'Basic Education', path: '/candidate/profile/basic-education' },
  { name: 'College Education & plus', path: '/candidate/profile/college-education' },
  { name: 'work experience', path: '/candidate/profile/work-experience' }
];

const CandidatesRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={candidatesRoutes} resource={'candidate'}>
      <Switch>
        <PrivateRoute path={`${url}/home`} exact component={Home} />
        <PrivateRoute
          path={`${url}/profile/basic-education/form`}
          exact
          component={BasicEducationForm}
        />
        <PrivateRoute
          path={`${url}/profile/basic-education/form/:id`}
          exact
          component={BasicEducationForm}
        />
        <PrivateRoute path={`${url}/profile/basic-education`} exact component={BasicEducation} />
        <PrivateRoute
          path={`${url}/profile/personal-information`}
          exact
          component={PersonalInformationList}
        />
        <PrivateRoute
          path={`${url}/profile/personal-information/form`}
          exact
          component={PersonalInformationForm}
        />
        <PrivateRoute path={`${url}/profile/basic-education`} exact component={Home} />
        <PrivateRoute
          path={`${url}/profile/college-education`}
          exact
          component={CollegeEducation}
        />
        <PrivateRoute
          path={`${url}/profile/college-education/form`}
          exact
          component={CollegeEducationForm}
        />
        <PrivateRoute
          path={`${url}/profile/college-education/form/:id`}
          exact
          component={CollegeEducationForm}
        />
        <PrivateRoute path={`${url}/profile/other-education`} exact component={Home} />
        <PrivateRoute path={`${url}/profile/work-experience`} exact component={WorkExperience} />
        <PrivateRoute
          path={`${url}/profile/work-experience/form`}
          exact
          component={WorkExperienceForm}
        />
        <PrivateRoute
          path={`${url}/profile/work-experience/form/:id`}
          component={WorkExperienceForm}
        />
        <PrivateRoute path={`${url}/profile/hobbies`} exact component={Home} />
        <PrivateRoute path={`${url}/profile/time-range`} exact component={Home} />
        <PrivateRoute path={`${url}/profile/`}>
          <Redirect to={`${url}/profile/personal-information`} />
        </PrivateRoute>
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default CandidatesRoutes;
