import { useEffect, useState } from 'react';
import styles from './companies.module.css';

function Companies() {
  const [companies, saveCompanies] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies`)
      .then((response) => response.json())
      .then((response) => {
        saveCompanies(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Companies</h2>
      <div>
        {companies.map((company) => {
          return <div key={company._id}>{company.email}</div>;
        })}
      </div>
    </section>
  );
}

export default Companies;
