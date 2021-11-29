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

  const onClick = (id) => {
    fetch(`${process.env.REACT_APP_API}/candidates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setCandidates(candidates.filter((deleteCandidate) => deleteCandidate._id !== id));
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className={styles.container}>
      <h2>Candidates</h2>
      <div>
        <button
          type="button"
          onClick={() => {
            window.location.href = `/candidates/form`;
          }}
        >
          Create
        </button>
        <table className={styles.resourceTableHead}>
          <thead>
            <tr className={styles.table}>
              <th className={styles.th}>firstName</th>
              <th className={styles.th}>lastName</th>
              <th className={styles.th}>phone</th>
              <th className={styles.th}>email</th>
              <th className={styles.th}>country</th>
              <th className={styles.th}>province</th>
              <th className={styles.th}>city</th>
              <th className={styles.th}>Postal Code</th>
              <th className={styles.th}>Address</th>
              <th className={styles.th}>Birthday</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.table}>
            {candidates.map((candidate) => {
              return (
                <tr
                  onDoubleClick={() => {
                    window.location.href = `/candidates/list?_id=${candidate._id}`;
                  }}
                  key={candidate._id}
                >
                  <td className={styles.td}>{candidate.firstName}</td>
                  <td className={styles.td}>{candidate.lastName}</td>
                  <td className={styles.td}>{candidate.phone}</td>
                  <td className={styles.td}>{candidate.email}</td>
                  <td className={styles.td}>{candidate.country}</td>
                  <td className={styles.td}>{candidate.province}</td>
                  <td className={styles.td}>{candidate.city}</td>
                  <td className={styles.td}>{candidate.postalCode}</td>
                  <td
                    className={styles.td}
                  >{`${candidate.address.street} ${candidate.address.number}`}</td>
                  <td className={styles.td}>{candidate.birthday}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = `/candidates/form?_id=${candidate._id}`;
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClick(candidate._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Candid;
