import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import Applications from '../Applications/index';
import Companies from '../Companies/index';
import Interviews from '../Interviews/index';
import Positions from '../Positions/index';
import Candidates from '../Candidates/index';
import { CandidatesForm } from '../Candidates/Form';
import ListItem from '../Candidates/ListItem';
import Profiles from '../Profiles/index';
import Psychologists from '../Psychologists/index';
import Sessions from '../Sessions/index';
import Home from '../Home/index';
import styles from './layout.module.css';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/applications':
      currentScreen = <Applications />;
      break;
    case '/companies':
      currentScreen = <Companies />;
      break;
    case '/interviews':
      currentScreen = <Interviews />;
      break;
    case '/positions':
      currentScreen = <Positions />;
      break;
    case '/candidates':
      currentScreen = <Candidates />;
      break;
    case '/candidates/form':
      currentScreen = <CandidatesForm />;
      break;
    case '/candidates/list':
      currentScreen = <ListItem />;
      break;
    case '/profiles':
      currentScreen = <Profiles />;
      break;
    case '/psychologists':
      currentScreen = <Psychologists />;
      break;
    case '/sessions':
      currentScreen = <Sessions />;
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
