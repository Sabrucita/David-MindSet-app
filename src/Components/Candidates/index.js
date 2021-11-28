import React, { useState, useEffect } from 'react';
import styles from './candidates.module.css';
import Form from './Form';
import List from './List';

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
        <Form />
        <List />
      </div>
    </section>
  );
}

export default Candid;
