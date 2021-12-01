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
    <div className={styles.containerMain}>
      <section className={styles.container}>
        <Modal
          show={showModal}
          closeModal={closeModal}
          onCloseModal={onConfirmDeleteModal}
          itemListInfo={itemListInfo}
          action={lastAction}
        />
        <aside className={styles.sideMenu}>
          <div>
            <ul>
              <li>.</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
            </ul>
          </div>
        </aside>
        <section className={styles.main}>
          <h1>Companies</h1>
          <table>
            <thead>
              <tr className={styles.title}>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.list}>
              {companies.map((company) => {
                return (
                  <tr key={company._id}>
                    <td>{company.name}</td>
                    <td>{company.address}</td>
                    <td>{company.city}</td>
                    <td>{company.phone}</td>
                    <td>{company.email}</td>
                    <td className={styles.keypad}>
                      <button
                        className="material-icons-outlined"
                        onClick={() => {
                          setShowModal(true);
                          setLastIdCLicked(company._id);
                          setLastAction('delete');
                        }}
                        type="button"
                      >
                        clear
                      </button>
                      <button
                        className="material-icons-outlined"
                        type="button"
                        onClick={() => {
                          window.location.href = `/companies/form?_id=${company._id}`;
                        }}
                      >
                        edit
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
                    </td>
                  </tr>
                );
              })}
              <button
                className={styles.buttonGreen}
                type="button"
                onClick={() => {
                  window.location.href = `/companies/form/new`;
                }}
              >
                ADD COMPANY
              </button>
            </tbody>
          </table>
        </section>
      </section>
    </div>
  );
}

export default Companies;
