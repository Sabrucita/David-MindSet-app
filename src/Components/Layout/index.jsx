import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import styles from './layout.module.css';

const Layout = ({ children, resource }) => {
  return (
    <div className={styles.container}>
      <Header resource={resource} />
      {children}
      <Footer resource={resource} />
    </div>
  );
};
export default Layout;
