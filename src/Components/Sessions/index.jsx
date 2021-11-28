import List from './List';
import styles from './sessions.module.css';

function Sessions() {
  return (
    <section className={styles.container}>
      <h2>Sessions</h2>
      <List />
      <a className={styles.createBtn} href="./sessions/form">
        ADD SESSION
      </a>
    </section>
  );
}

export default Sessions;
