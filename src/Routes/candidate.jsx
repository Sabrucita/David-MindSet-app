import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Home';
import BasicEducation from 'Components/Candidate/CurriculumVitae/BasicEducation';
import BasicEducationForm from 'Components/Candidate/CurriculumVitae/BasicEducation/Form';
import PersonalInformationList from 'Components/Candidate/CurriculumVitae/PersonalInformation';
import PersonalInformationForm from 'Components/Candidate/CurriculumVitae/PersonalInformation/Form';
import CollegeEducation from 'Components/Candidate/CurriculumVitae/CollegeEducation';
import CollegeEducationForm from 'Components/Candidate/CurriculumVitae/CollegeEducation/Form';
import WorkExperience from 'Components/Candidate/CurriculumVitae/WorkExperience';
import WorkExperienceForm from 'Components/Candidate/CurriculumVitae/WorkExperience/Form';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Availability from 'Components/Candidate/Profile/Availability';
import AvailabilityForm from 'Components/Candidate/Profile/Availability/Form';

const candidatesRoutes = [
  { name: 'Home', path: '/candidate' },
  { name: 'Personal Information', path: '/candidate/curriculumvitae/personal-information' },
  { name: 'Basic Education', path: '/candidate/curriculumvitae/basic-education' },
  { name: 'College Education & plus', path: '/candidate/curriculumvitae/college-education' },
  { name: 'Work Experience', path: '/candidate/curriculumvitae/work-experience' },
  { name: 'Availability', path: '/candidate/profile/availability' }
];

const CandidatesRoutes = () => {
  const role = useSelector((store) => store.auth.role);
  const history = useHistory();
  useEffect(() => {
    if (role !== 'candidate') {
      history.goBack();
    }
  }, []);

  const { url } = useRouteMatch();
  return (
    <Layout routes={candidatesRoutes} resource={'candidate'}>
      <Switch>
        <PrivateRoute path={`${url}/home`} exact component={Home} />
        <PrivateRoute
          path={`${url}/curriculumvitae/basic-education/form`}
          exact
          component={BasicEducationForm}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/basic-education/form/:id`}
          exact
          component={BasicEducationForm}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/basic-education`}
          exact
          component={BasicEducation}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/personal-information`}
          exact
          component={PersonalInformationList}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/personal-information/form`}
          exact
          component={PersonalInformationForm}
        />
        <PrivateRoute path={`${url}/curriculumvitae/basic-education`} exact component={Home} />
        <PrivateRoute
          path={`${url}/curriculumvitae/college-education`}
          exact
          component={CollegeEducation}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/college-education/form`}
          exact
          component={CollegeEducationForm}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/college-education/form/:id`}
          exact
          component={CollegeEducationForm}
        />
        <PrivateRoute path={`${url}/curriculumvitae/other-education`} exact component={Home} />
        <PrivateRoute
          path={`${url}/curriculumvitae/work-experience`}
          exact
          component={WorkExperience}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/work-experience/form`}
          exact
          component={WorkExperienceForm}
        />
        <PrivateRoute
          path={`${url}/curriculumvitae/work-experience/form/:id`}
          component={WorkExperienceForm}
        />
        <PrivateRoute path={`${url}/curriculumvitae/hobbies`} exact component={Home} />
        <PrivateRoute path={`${url}/curriculumvitae/time-range`} exact component={Home} />
        <PrivateRoute path={`${url}/curriculumvitae/`}>
          <Redirect to={`${url}/curriculumvitae/personal-information`} />
        </PrivateRoute>
        <PrivateRoute path={`${url}/profile/availability`} exact component={Availability} />
        <PrivateRoute path={`${url}/profile/availability/form/`} component={AvailabilityForm} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default CandidatesRoutes;
