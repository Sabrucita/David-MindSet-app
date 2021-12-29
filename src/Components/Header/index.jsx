import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';

function Header({ routes }) {
  const role = useSelector((store) => store.auth.role);
  const authenticated = useSelector((store) => store.auth.authenticated);

  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logOut());
    history.push('/home');
  };

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
          <Link to={'/home'}>
            Mind<span>SET</span>
          </Link>
        </div>
        <ul className={styles.rutes}>
          {routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
          {role && authenticated ? (
            <li>
              <button className={styles.LogOut} onClick={logout}>
                Log Out
              </button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
