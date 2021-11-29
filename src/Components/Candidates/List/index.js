import { useEffect, useState } from 'react';
import React from 'react';
import styles from './list.module.css';

const params = new URLSearchParams(window.location.search);
const candidateId = params.get('_id');

function ListItem() {
  const [candidate, setCandidate] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/candidates/${candidateId}`)
      .then((response) => response.json())
      .then((response) => {
        setCandidate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>CANDIDATE INFO</h2>
      <div>
        <ul key={candidate._id}>
          <li>{candidate.firstName}</li>
          <li>{candidate.lastName}</li>
          <li>{candidate.email}</li>
          <li>{candidate.password}</li>
          <li>{candidate.phone}</li>
          <li>{candidate.phone}</li>
          <li>{candidate.city}</li>
          <li>{candidate.province}</li>
          <li>{candidate.country}</li>
          <li>{candidate.postalCode}</li>
          <li>{candidate.birthday}</li>
          <li>{candidate.hobbies}</li>
          <li>{candidate.mainSkills}</li>
          <li>{candidate.profileTypes}</li>
          <li>{candidate.isOpenToWork}</li>
          <li>{candidate.isActive}</li>
          <li>{candidate.education}</li>
          <li>{candidate.experiences}</li>
          <li>{candidate.courses}</li>
          <button
            type="button"
            onClick={() => {
              window.location.href = `/candidates`;
            }}
          >
            Back
          </button>
        </ul>
      </div>
    </section>
  );
}

export default ListItem;
