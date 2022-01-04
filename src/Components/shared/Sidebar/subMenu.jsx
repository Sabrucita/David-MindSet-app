import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const SubMenu = ({ item }) => {
  const [subNav, setSubNav] = useState();
  const showSubNav = () => setSubNav(!subNav);

  return (
    <>
      <li className={styles.navText}>
        <Link to={item.path} onClick={item.subNav && showSubNav}>
          <span>{item.title}</span>
        </Link>
        <li>{item.subNav && subNav ? item.iconOpened : item.subNav ? item.iconClosed : null}</li>
      </li>
      {subNav &&
        item.subNav.map((item, index) => {
          return (
            <li key={index} className={styles.subNavText}>
              <Link to={item.path}>
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
    </>
  );
};

export default SubMenu;
