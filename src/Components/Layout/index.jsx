import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
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
import PsychologistForm from '../Psychologists/Form';
import AdminsForm from '../Admins/Form';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/administrators" component={Admins} />
          <Route exact path="/administrators/form" component={AdminsForm} />
          <Route path="/administrators/form/:id" component={AdminsForm} />
          <Route exact path="/applications" component={Applications} />
          <Route exact path="/applications/form" component={ApplicationsForm} />
          <Route path="/applications/form/:id" component={ApplicationsForm} />
          <Route exact path="/companies" component={Companies} />
          <Route exact path="/companies/form" component={CompaniesForm} />
          <Route path="/companies/form/:id" component={CompaniesForm} />
          <Route exact path="/interviews" component={Interviews} />
          <Route exact path="/interviews/form" component={InterviewsForm} />
          <Route path="/interviews/form/:id" component={InterviewsForm} />
          <Route exact path="/positions" component={Positions} />
          <Route exact path="/positions/form" component={PositionsForm} />
          <Route path="/positions/form/:id" component={PositionsForm} />
          <Route exact path="/candidates" component={Candidates} />
          <Route exact path="/candidates/form" component={CandidatesForm} />
          <Route path="/candidates/form/:id" component={CandidatesForm} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profiles/form" component={ProfilesForm} />
          <Route path="/profiles/form/:id" component={ProfilesForm} />
          <Route exact path="/psychologists" component={Psychologists} />
          <Route exact path="/psychologists/form" component={PsychologistForm} />
          <Route path="/psychologists/form/:id" component={PsychologistForm} />
          <Route exact path="/sessions" component={Sessions} />
          <Route exact path="/sessions/form" component={SessionsForm} />
          <Route path="/sessions/form/:id" component={SessionsForm} />
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};
export default Layout;
