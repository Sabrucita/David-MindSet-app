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
            <a href="/administrators">admins</a>
          </li>
          <li>
            <a href="/applications">applications</a>
          </li>
          <li>
            <a href="/companies">companies</a>
          </li>
          <li>
            <a href="/interviews">interviews</a>
          </li>
          <li>
            <a href="/positions">positions</a>
          </li>
          <li>
            <a href="/candidates">candidates</a>
          </li>
          <li>
            <a href="/profiles">profiles</a>
          </li>
          <li>
            <a href="/psychologists">psychologists</a>
          </li>
          <li>
            <a href="/sessions">sessions</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
