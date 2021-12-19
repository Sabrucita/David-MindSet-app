import Layout from 'Components/Layout';
import styles from './home.module.css';

function Home() {
  return (
    <Layout resource={'admin'}>
      <section className={styles.container}>
        <h2>Home</h2>
      </section>
    </Layout>
  );
}

export default Home;
