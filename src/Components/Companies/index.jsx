import { useEffect, useState } from 'react';
import styles from './companies.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';

function Companies() {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();

  const url = process.env.REACT_APP_API;
  //Get info from DB
  useEffect(() => {
    fetch(`${url}/companies`)
      .then((response) => response.json())
      .then((response) => {
        setCompanies(response.data);
      });
  }, []);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    setTypeModal(type);
    setTitleModal(title);
    setShowModal(true);
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    fetch(`${url}/companies/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setCompanies(
          companies.filter((company) => {
            return company._id !== selectedItem.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const tableHeader = ['Name', 'Address', 'City', 'Phone', 'Email', 'Actions'];

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <Modal
          showModal={showModal}
          closeModalFn={closeModal}
          acceptModalFn={acceptModal}
          content={selectedItem}
          type={typeModal}
          titleModal={titleModal}
        />
        <h1 className={styles.h1}>Companies</h1>
        <List data={companies} header={tableHeader} openModal={openModal} />
        <Link to="/companies/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>ADD COMPANY</span>
        </Link>
      </section>
    </div>
  );
}

export default Companies;
