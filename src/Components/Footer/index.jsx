import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <div className={styles.appName}>
          Mind<span>SET</span>
        </div>
        <ul className={styles.rutes}>
          <li>
            <Link to="/administrators">admins</Link>
          </li>
          <li>
            <Link to="/applications">applications</Link>
          </li>
          <li>
            <Link to="/companies">companies</Link>
          </li>
          <li>
            <Link to="/interviews">interviews</Link>
          </li>
          <li>
            <Link to="/positions">positions</Link>
          </li>
          <li>
            <Link to="/postulants">postulants</Link>
          </li>
          <li>
            <Link to="/profiles">profiles</Link>
          </li>
          <li>
            <Link to="/psychologists">psychologists</Link>
          </li>
          <li>
            <Link to="/sessions">sessions</Link>
          </li>
        </ul>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © 2021 Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
