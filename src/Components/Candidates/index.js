import React, { useState, useEffect } from 'react';
import styles from './candidates.module.css';
/*import Form from './Form';
import List from './List';*/

function Candid() {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response.candidates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Candidates</h2>
      <div>
        <table className={styles.resourceTable}>
          <thead>
            <tr className={styles.table}>
              <th className={styles.th}>firstName</th>
              <th className={styles.th}>lastName</th>
              <th className={styles.th}>email</th>
              <th className={styles.th}>password</th>
              <th className={styles.th}>phone</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
        </table>
        {candidates.map((candidate) => {
          return (
            <table className={styles.resourceTable} key={candidate.id}>
              <tbody className={styles.table}>
                <tr>
                  <td className={styles.td}>{candidate.firstName}</td>
                  <td className={styles.td}>{candidate.lastName}</td>
                  <td className={styles.td}>{candidate.email}</td>
                  <td className={styles.td}>{candidate.password}</td>
                  <td className={styles.td}>{candidate.phone}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </section>
  );
}

export default Candid;
