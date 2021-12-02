import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/List/index';
import Applications from '../Applications/index';
import ApplicationsForm from '../Applications/Form';
import Companies from '../Companies/List/index';
import CompaniesForm from '../Companies/Form';
import Interviews from '../Interviews/index';
import InterviewsForm from '../Interviews/Form';
import Positions from '../Positions/index';
import PositionsForm from '../Positions/Form/index';
import Candidates from '../Candidates/index';
import CandidatesForm from '../Candidates/Form';
import Profiles from '../Profiles/index';
import Psychologists from '../Psychologists/List/index';
import ProfilesForm from '../Profiles/Form';
import Sessions from '../Sessions/index';
import SessionsForm from '../Sessions/Form/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import { PsychologistForm } from '../Psychologists/Form';
import { AdminsForm } from '../Admins/Form';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/admins/form':
      currentScreen = <AdminsForm />;
      break;
    case '/admins/form/new':
      currentScreen = <AdminsForm />;
      break;
    case '/applications':
      currentScreen = <Applications />;
      break;
    case '/applications/form':
      currentScreen = <ApplicationsForm />;
      break;
    case '/companies':
      currentScreen = <Companies />;
      break;
    case '/companies/form':
      currentScreen = <CompaniesForm />;
      break;
    case '/companies/form/new':
      currentScreen = <CompaniesForm />;
      break;
    case '/interviews':
      currentScreen = <Interviews />;
      break;
    case '/interviews/form':
      currentScreen = <InterviewsForm />;
      break;
    case '/positions':
      currentScreen = <Positions />;
      break;
    case '/positions/form':
      currentScreen = <PositionsForm />;
      break;
    case '/candidates':
      currentScreen = <Candidates />;
      break;
    case '/candidates/form':
      currentScreen = <CandidatesForm />;
      break;
    case '/profiles':
      currentScreen = <Profiles />;
      break;
    case '/profiles/form':
      currentScreen = <ProfilesForm />;
      break;
    case '/psychologists':
      currentScreen = <Psychologists />;
      break;
    case '/psychologists/form':
      currentScreen = <PsychologistForm />;
      break;
    case '/psychologists/form/new':
      currentScreen = <PsychologistForm />;
      break;
    case '/sessions':
      currentScreen = <Sessions />;
      break;
    case '/sessions/form':
      currentScreen = <SessionsForm />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
