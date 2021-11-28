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
            <div key={company._id}>
              <p>{company.name}</p>
              <p>{company.address}</p>
              <p>{company.city}</p>
              <p>{company.province}</p>
              <p>{company.country}</p>
              <p>{company.zipCode}</p>
              <p>{company.phone}</p>
              <p>{company.email}</p>
              <p>{company.pictureUrl}</p>
              <p>{company.contactFullName}</p>
              <p>{company.contactPhone}</p>
              <p>{company.isActive}</p>
              <button
                type="button"
                onClick={() => {
                  console.log('hola');
                  window.location.href = `/companies/form?_id=${company._id}`;
                }}
              >
                EDIT
              </button>
              <button type="button">DELETE</button>
            </div>
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
