import { useEffect, useState } from 'react';
import styles from './candidates.module.css';

function Candid() {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response.candidates);
      });
  }, []);
  console.log(candidates);

  return (
    <section className={styles.container}>
      <h2>Candidates</h2>
      <div>
        {candidates.map((candidates) => {
          return <div key={candidates._id}>{candidates.firstName}</div>;
        })}
      </div>
    </section>
  );
}

export default Candid;
