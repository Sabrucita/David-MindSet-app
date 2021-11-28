import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import Applications from '../Applications/index';
import ApplicationsForm from '../Applications/Form';
import Companies from '../Companies/index';
import Interviews from '../Interviews/index';
import Positions from '../Positions/index';
import Postulants from '../Postulants/index';
import Profiles from '../Profiles/index';
import Psychologists from '../Psychologists/index';
import Sessions from '../Sessions/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import { useState } from 'react';

function Layout() {
  const [typeForm, setTypeForm] = useState('');
  const [idToUpdate, setIdToUpdate] = useState();
  const selectTypeForm = (type) => {
    setTypeForm(type);
  };
  const getIdSelected = (id) => {
    setIdToUpdate(id);
  };

  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/applications':
      localStorage.setItem('typeForm', typeForm);
      localStorage.setItem('idToUpdate', idToUpdate);
      currentScreen = (
        <Applications selectTypeForm={selectTypeForm} getIdSelected={getIdSelected} />
      );
      break;
    case '/applications/form':
      //the form doesnt receive the typeForm  or idToUpdate as state. I had to hardcoded!
      currentScreen = <ApplicationsForm />;
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
