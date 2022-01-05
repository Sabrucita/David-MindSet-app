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
import WorkProfile from 'Components/Candidate/CurriculumVitae/WorkProfile';
import availableDates from 'Components/Candidate/CurriculumVitae/WorkProfile/AvailableDates';
import TimeRange from 'Components/Candidate/CurriculumVitae/TimeRange';
import TimeRangeForm from 'Components/Candidate/CurriculumVitae/TimeRange/Form';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from 'Components/shared/Sidebar';
import styles from './routes.module.css';
import Availability from 'Components/Candidate/Profile/Availability';
import AvailabilityForm from 'Components/Candidate/Profile/Availability/Form';
import JobOpportunities from 'Components/Candidate/Profile/JobOpportunites';

const candidatesRoutes = [
  { name: 'Home', path: '/candidate' },
  { name: 'Personal Information', path: '/candidate/curriculumvitae/personal-information' },
  { name: 'Basic Education', path: '/candidate/curriculumvitae/basic-education' },
  { name: 'College Education & plus', path: '/candidate/curriculumvitae/college-education' },
  { name: 'Other Education & Languages', path: '/candidate/curriculumvitae/other-education' },
  { name: 'Work Experience', path: '/candidate/curriculumvitae/work-experience' },
  { name: 'Time Range', path: '/candidate/curriculumvitae/time-range/form' },
  { name: 'Work Profile', path: '/candidate/curriculumvitae/work-profile' },
  { name: 'Availability', path: '/candidate/profile/availability' },
  { name: 'Job Opportunities', path: '/candidate/profile/job-opportunities' }
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
          <PrivateRoute path={`${url}/curriculumvitae/hobbies`} exact component={Home} />
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
          <PrivateRoute path={`${url}/profile/availability`} exact component={Availability} />
          <PrivateRoute path={`${url}/profile/availability/form/`} component={AvailabilityForm} />
          <PrivateRoute path={`${url}/profile/job-opportunities`} component={JobOpportunities} />
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
