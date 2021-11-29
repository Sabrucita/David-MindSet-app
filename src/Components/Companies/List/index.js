import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import styles from './list.module.css';

function Companies() {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [lastIdClicked, setLastIdCLicked] = useState('');
  const [lastAction, setLastAction] = useState('');
  const [itemListInfo, setItemListInfo] = useState('');

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

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  //FUNCTION FOR DELETING A COMPANY
  const deleteClick = (id) => {
    fetch(`${process.env.REACT_APP_API}/companies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status == 204) {
          setCompanies(companies.filter((deleteCompany) => deleteCompany._id !== id));
        }
      })
      .catch((error) => console.log(error));
  };

  const onConfirmDeleteModal = () => {
    deleteClick(lastIdClicked);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        closeModal={closeModal}
        onCloseModal={onConfirmDeleteModal}
        itemListInfo={itemListInfo}
        action={lastAction}
      />
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
                onClick={() => {
                  setShowModal(true);
                  setLastIdCLicked(company._id);
                  setLastAction('delete');
                }}
                type="button"
              >
                DELETE
              </button>
              <button
                onClick={() => {
                  setLastIdCLicked(company._id);
                  setLastAction('view');
                  setItemListInfo(company);
                  setShowModal(true);
                }}
                type="button"
              >
                VIEW MORE
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
