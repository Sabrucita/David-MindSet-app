import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
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
      <nav className={styles.navbar}>
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
            <Link to="/candidates">candidates</Link>
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
      </nav>
    </header>
  );
}

export default Header;
