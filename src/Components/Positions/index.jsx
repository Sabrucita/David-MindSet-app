import List from './List';
import styles from './positions.module.css';

function Positions() {
  const addPosition = () => {
    localStorage.setItem('operation', 'create');
    localStorage.setItem('id', '');
    window.location.pathname = './positions/form';
  };

  return (
    <section className={styles.container}>
      <h2>Positions</h2>
      <List />
      <button className={styles.createBtn} onClick={addPosition}>
        ADD POSITION
      </button>
    </section>
  );
}

export default Positions;
