import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import styles from './layout.module.css';

const Layout = ({ children, routes }) => {
  return (
    <div className={styles.container}>
      <Header routes={routes} />
      {children}
      <Footer routes={routes} />
    </div>
  );
};
export default Layout;
