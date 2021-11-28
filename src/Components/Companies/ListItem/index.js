import { useEffect, useState } from 'react';
import React from 'react';
import styles from './listItem.module.css';

const params = new URLSearchParams(window.location.search);
const clientId = params.get('_id');

function ListItem() {
  const [company, setCompany] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies/${clientId}`)
      .then((response) => response.json())
      .then((response) => {
        setCompany(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>{company.name} Information</h2>
      <div>
        <ul className={styles.ulCompanies} key={clientId}>
          <li>Company Name: {company.name}</li>
          <li>Address: {company.address}</li>
          <li>City: {company.city}</li>
          <li>Province: {company.province}</li>
          <li>Country: {company.country}</li>
          <li>Zip Code: {company.zipCode}</li>
          <li>Phone: {company.phone}</li>
          <li>Email: {company.email}</li>
          <li>Picture URL: {company.pictureUrl}</li>
          <li>Contact Full Name: {company.contactFullName}</li>
          <li>Contact Phone: {company.contactPhone}</li>
          <li>Is Available? {company.isActive ? 'YES' : 'NO'}</li>
          <button
            type="button"
            onClick={() => {
              window.location.href = `/companies`;
            }}
          >
            RETURN
          </button>
        </ul>
      </div>
    </section>
  );
}

export default ListItem;
