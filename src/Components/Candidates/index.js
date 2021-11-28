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
        <button>Create</button>
        <table className={styles.resourceTableHead}>
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
            // eslint-disable-next-line react/jsx-key
            <table className={styles.resourceTable}>
              <tbody className={styles.table}>
                <tr>
                  <td className={styles.td} key={candidate._id}>
                    {candidate.firstName}
                  </td>
                  <td className={styles.td}>{candidate.lastName}</td>
                  <td className={styles.td}>{candidate.email}</td>
                  <td className={styles.td}>{candidate.password}</td>
                  <td className={styles.td}>{candidate.phone}</td>
                  <td className={styles.td}>{candidate.phone}</td>
                  <td className={styles.td}>{candidate.city}</td>
                  <td className={styles.td}>{candidate.province}</td>
                  <td className={styles.td}>{candidate.country}</td>
                  <td className={styles.td}>{candidate.postalCode}</td>
                  <td className={styles.td}>{candidate.birthday}</td>
                  <td className={styles.td}>{candidate.hobbies}</td>
                  <td className={styles.td}>{candidate.mainSkills}</td>
                  <td className={styles.td}>{candidate.profileTypes}</td>
                  <td className={styles.td}>{candidate.isOpenToWork}</td>
                  <td className={styles.td}>{candidate.isActive}</td>
                  <td className={styles.td}>{candidate.education}</td>
                  <td className={styles.td}>{candidate.experiences}</td>
                  <td className={styles.td}>{candidate.courses}</td>
                  <td>
                    <button>Edit</button>
                    <button
                      type="button"
                      onClick={() => {
                        fetch(`${process.env.REACT_APP_API}/candidates/${candidate._id}`, {
                          method: 'DELETE',
                          headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                          }
                        })
                          .then((response) => {
                            if (response.status == 204) {
                              setCandidates(
                                candidates.filter(
                                  (deleteCandidate) => deleteCandidate._id !== candidate._id
                                )
                              );
                            }
                          })
                          // eslint-disable-next-line
                          .then((res) => location.reload())
                          .catch((error) => console.log(error));
                      }}
                    >
                      Delete
                    </button>
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
