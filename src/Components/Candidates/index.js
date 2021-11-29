import React, { useState, useEffect } from 'react';
import styles from './candidates.module.css';
/*import Form from './Form';
import List from './List';*/

//FUNCTION TO LIST ALL CANDIDATES
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

  //FUNCTION TO DELETE A CANDIDATE BY ID
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
        <table className={styles.list}>
          <thead>
            <tr>
              <th>first name</th>
              <th>last name</th>
              <th>phone</th>
              <th>email</th>
              <th>country</th>
              <th>province</th>
              <th>city</th>
              <th>postal code</th>
              <th>address</th>
              <th>birthday</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              return (
                <tr
                  onDoubleClick={() => {
                    window.location.href = `/candidates/list?_id=${candidate._id}`;
                  }}
                  key={candidate._id}
                >
                  <td>{candidate.firstName}</td>
                  <td>{candidate.lastName}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.country}</td>
                  <td>{candidate.province}</td>
                  <td>{candidate.city}</td>
                  <td>{candidate.postalCode}</td>
                  <td>{`${candidate.address.street} ${candidate.address.number}`}</td>
                  <td>{candidate.birthday}</td>
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
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            window.location.href = `/candidates/form`;
          }}
        >
          Add
        </button>
      </div>
    </section>
  );
}

export default Candid;
