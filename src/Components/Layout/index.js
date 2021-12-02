import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import Applications from '../Applications/index';
import Companies from '../Companies/List/index';
import Interviews from '../Interviews/index';
import Positions from '../Positions/index';
import Postulants from '../Postulants/index';
import Profiles from '../Profiles/index';
import Psychologists from '../Psychologists/index';
import Sessions from '../Sessions/index';
import SessionsForm from '../Sessions/Form/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import { CompaniesForm } from '../Companies/Form';
import ListItem from '../Companies/ListItem';

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
    case '/companies/form':
      currentScreen = <CompaniesForm />;
      break;
    case '/companies/form/new':
      currentScreen = <CompaniesForm />;
      break;
    case '/companies/listitem':
      currentScreen = <ListItem />;
      break;
    case '/interviews':
      currentScreen = <Interviews />;
      break;
    case '/positions':
      currentScreen = <Positions />;
      break;
    case '/postulants':
      currentScreen = <Postulants />;
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
