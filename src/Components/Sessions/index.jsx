import List from './List';
import styles from './sessions.module.css';

function Sessions() {
  const addSession = () => {
    localStorage.setItem('operation', 'create');
    localStorage.setItem('id', '');
    window.location.pathname = './sessions/form';
  };

  return (
    <section className={styles.container}>
      <h2>Sessions</h2>
      <List />
      <button className={styles.createBtn} onClick={addSession}>
        ADD SESSION
      </button>
    </section>
  );
}

export default Sessions;
