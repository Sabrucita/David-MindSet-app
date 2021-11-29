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
        <table className={styles.list}>
          <tr key={candidate._id}>
            <td>Name: {candidate.firstName}</td>
            <tr>
              <td>Surname: {candidate.lastName}</td>
            </tr>
            <tr>
              <td>E-Mail: {candidate.email}</td>
            </tr>
            <tr>
              <td>PassWord: {candidate.password}</td>
            </tr>
            <tr>
              <td>Phone Number: {candidate.phone}</td>
            </tr>
            <tr>
              <td>City: {candidate.city}</td>
            </tr>
            <tr>
              <td>Province: {candidate.province}</td>
            </tr>
            <tr>
              <td>Country: {candidate.country}</td>
            </tr>
            <tr>
              <td>Zip Code: {candidate.postalCode}</td>
            </tr>
            <tr>
              <td>Birthday: {candidate.birthday}</td>
            </tr>
            <tr>
              <td>Hobbies: {candidate.hobbies}</td>
            </tr>
            <tr>
              <td>Main Skills: {candidate.mainSkills}</td>
            </tr>
            <tr>
              <td>Profile Types: {candidate.profileTypes}</td>
            </tr>
            <tr>
              <td>Is Open To Work: {candidate.isOpenToWork}</td>
            </tr>
            <tr>
              <td>Is Active: {candidate.isActive}</td>
            </tr>
            <tr>
              <td>Education: {candidate.education}</td>
            </tr>
            <tr>
              <td>Experiences: {candidate.experiences}</td>
            </tr>
            <td>Courses: {candidate.courses}</td>
          </tr>
          <tr>
            <td>Address Street: {candidate.street}</td>
          </tr>
          <tr>
            <td>Address Number: {candidate.number}</td>
          </tr>
          <button
            type="button"
            onClick={() => {
              window.location.href = `/candidates`;
            }}
          >
            Back
          </button>
        </table>
      </div>
    </section>
  );
}

export default ListItem;
