import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Home';
import BasicEducation from 'Components/Candidate/CurriculumVitae/BasicEducation';
import BasicEducationForm from 'Components/Candidate/CurriculumVitae/BasicEducation/Form';
import PersonalInformationList from 'Components/Candidate/CurriculumVitae/PersonalInformation';
import PersonalInformationForm from 'Components/Candidate/CurriculumVitae/PersonalInformation/Form';
import CollegeEducation from 'Components/Candidate/CurriculumVitae/CollegeEducation';
import CollegeEducationForm from 'Components/Candidate/CurriculumVitae/CollegeEducation/Form';
import OtherEducation from 'Components/Candidate/CurriculumVitae/OtherEducation';
import OtherEducationForm from 'Components/Candidate/CurriculumVitae/OtherEducation/Form';
import WorkExperience from 'Components/Candidate/CurriculumVitae/WorkExperience';
import WorkExperienceForm from 'Components/Candidate/CurriculumVitae/WorkExperience/Form';
import Hobbies from 'Components/Candidate/CurriculumVitae/HobbiesAndSkills';
import HobbiesForm from 'Components/Candidate/CurriculumVitae/HobbiesAndSkills/Form';
import WorkProfile from 'Components/Candidate/CurriculumVitae/WorkProfile';
import availableDates from 'Components/Candidate/CurriculumVitae/WorkProfile/AvailableDates';
import TimeRange from 'Components/Candidate/CurriculumVitae/TimeRange';
import TimeRangeForm from 'Components/Candidate/CurriculumVitae/TimeRange/Form';
import Availability from 'Components/Candidate/Profile/Availability';
import AvailabilityForm from 'Components/Candidate/Profile/Availability/Form';
import Profile from 'Components/Candidate/Profile';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from 'Components/shared/Sidebar';
import styles from './routes.module.css';

const candidatesRoutes = [
  { name: 'Home', path: '/candidate' },
  { name: 'Personal Information', path: '/candidate/curriculumvitae/personal-information' },
  { name: 'Basic Education', path: '/candidate/curriculumvitae/basic-education' },
  { name: 'College Education & plus', path: '/candidate/curriculumvitae/college-education' },
  { name: 'work experience', path: '/candidate/curriculumvitae/work-experience' },
  { name: 'Hobbies & Skills', path: '/candidate/curriculumvitae/hobbies-and-skills' },
  { name: 'Other Education & Languages', path: '/candidate/curriculumvitae/other-education' },
  { name: 'Time Range', path: '/candidate/curriculumvitae/time-range/form' },
  { name: 'Work Profile', path: '/candidate/curriculumvitae/work-profile' },
  { name: 'Availability', path: '/candidate/profile/availability' }
];

const CandidatesRoutes = () => {
  const role = useSelector((store) => store.auth.role);
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (role !== 'candidate') {
      history.goBack();
    }
  }, []);

  return (
    <Layout routes={candidatesRoutes} resource={'candidate'}>
      <div className={styles.bodyContainer}>
        <Sidebar />
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
          <PrivateRoute
            path={`${url}/curriculumvitae/other-education`}
            exact
            component={OtherEducation}
          />
          <PrivateRoute
            path={`${url}/curriculumvitae/other-education/form`}
            exact
            component={OtherEducationForm}
          />
          <PrivateRoute
            path={`${url}/curriculumvitae/other-education/form/:id`}
            exact
            component={OtherEducationForm}
          />
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
          <PrivateRoute
            path={`${url}/curriculumvitae/hobbies-and-skills`}
            exact
            component={Hobbies}
          />
          <PrivateRoute
            path={`${url}/curriculumvitae/hobbies-and-skills/form`}
            exact
            component={HobbiesForm}
          />
          <PrivateRoute
            path={`${url}/curriculumvitae/hobbies-and-skills/form/:id`}
            exact
            component={HobbiesForm}
          />
          <PrivateRoute path={`${url}/curriculumvitae/time-range`} exact component={TimeRange} />
          <PrivateRoute
            path={`${url}/curriculumvitae/time-range/form`}
            exact
            component={TimeRangeForm}
          />
          <PrivateRoute
            path={`${url}/curriculumvitae/work-profile`}
            exact
            component={WorkProfile}
          />
          <PrivateRoute
            path={`${url}/curriculumvitae/work-profile/available-dates`}
            exact
            component={availableDates}
          />
          <PrivateRoute
            path={`${url}/curriculumvitae/work-profile/available-dates/:id`}
            component={availableDates}
          />
          <PrivateRoute path={`${url}/profile`} exact component={Profile} />
          <PrivateRoute path={`${url}/profile/availability`} exact component={Availability} />
          <PrivateRoute path={`${url}/profile/availability/form/`} component={AvailabilityForm} />
          <PrivateRoute path={`${url}/curriculumvitae/`}>
            <Redirect to={`${url}/curriculumvitae/personal-information`} />
          </PrivateRoute>
          <Redirect to={`${url}/home`} />
        </Switch>
      </div>
    </Layout>
  );
};

export default CandidatesRoutes;
