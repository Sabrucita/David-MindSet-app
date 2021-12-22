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
        <Route path={`${url}/home`} exact component={Home} />
        <Route path={`${url}/sign-up`} exact component={Home} />
        <Route path={`${url}/sign-up/step2`} exact component={Home} />
        <Route path={`${url}/profile/basic-education/form`} exact component={BasicEducationForm} />
        <Route
          path={`${url}/profile/basic-education/form/:id`}
          exact
          component={BasicEducationForm}
        />
        <Route path={`${url}/profile/basic-education`} exact component={BasicEducation} />
        <Route
          path={`${url}/profile/personal-information`}
          exact
          component={PersonalInformationList}
        />
        <Route
          path={`${url}/profile/personal-information/form`}
          exact
          component={PersonalInformationForm}
        />
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
        <Route path={`${url}/profile/work-experience`} exact component={WorkExperience} />
        <Route path={`${url}/profile/work-experience/form`} exact component={WorkExperienceForm} />
        <Route path={`${url}/profile/work-experience/form/:id`} component={WorkExperienceForm} />
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
