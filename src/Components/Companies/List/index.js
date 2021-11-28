import { useEffect, useState } from 'react';
import styles from './list.module.css';

function Companies() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies`)
      .then((response) => response.json())
      .then((response) => {
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
            <ul
              onDoubleClick={() => {
                window.location.href = `/companies/listitem?_id=${company._id}`;
              }}
              className={styles.ulCompanies}
              key={company._id}
            >
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
              <button
                //FUNCTION FOR DELETING A COMPANY
                type="button"
                onClick={() => {
                  fetch(`${process.env.REACT_APP_API}/companies/${company._id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8'
                    }
                  })
                    .then((response) => {
                      if (response.status == 204) {
                        setCompanies(
                          companies.filter((deleteCompany) => deleteCompany._id !== company._id)
                        );
                      }
                    })
                    .catch((error) => console.log(error));
                }}
              >
                DELETE
              </button>
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
