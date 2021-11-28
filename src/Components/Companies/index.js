import { useEffect, useState } from 'react';
import styles from './companies.module.css';

function Companies() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCompanies(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Companies</h2>
      <div>
        {companies.map((company) => {
          return (
            <ul className={styles.ulCompanies} key={company._id}>
              <li>{company.name}</li>
              <li>{company.address}</li>
              <li>{company.city}</li>
              <li>{company.province}</li>
              <li>{company.country}</li>
              <li>{company.zipCode}</li>
              <li>{company.phone}</li>
              <li>{company.email}</li>
              <li>{company.pictureUrl}</li>
              <li>{company.contactFullName}</li>
              <li>{company.contactPhone}</li>
              <li>{company.isActive}</li>
              <button
                type="button"
                onClick={() => {
                  window.location.href = `/companies/form?_id=${company._id}`;
                }}
              >
                EDIT
              </button>
              <button type="button">DELETE</button>
            </ul>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          window.location.href = `/companies/form/new`;
        }}
      >
        ADD COMPANY
      </button>
    </section>
  );
}

export default Companies;
