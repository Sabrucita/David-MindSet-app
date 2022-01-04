import React from 'react';
import styles from './sidebar.module.css';
import { sidebarCandidate, sidebarPsychologist, sidebarAdmin } from './sidebarData';
import SubMenu from './subMenu';
import { useSelector } from 'react-redux';

function Sidebar() {
  const role = useSelector((store) => store.auth.role);
  let sidebarContent = [];
  if (role === 'candidate') {
    sidebarContent = sidebarCandidate;
  } else if (role === 'psychologist') {
    sidebarContent = sidebarPsychologist;
  } else if (role === 'admin') {
    sidebarContent = sidebarAdmin;
  }
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.navMenuItems}>
            <li className={styles.navbarToggle}></li>
            {sidebarContent.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
