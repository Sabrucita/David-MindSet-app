import { useEffect, useState } from 'react';
import styles from './psychologists.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader/index';

function Psychologists() {
  const [showModal, setShowModal] = useState(false);
  const [psychologists, setPsychologists] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const url = process.env.REACT_APP_API;
  //Get app info from DB
  useEffect(() => {
    fetch(`${url}/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        setPsychologists(response);
        setIsFetching(false);
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
    fetch(`${url}/psychologists/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setPsychologists(
          psychologists.filter((app) => {
            return app._id !== selectedItem.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const tableHeader = ['First Name', 'Last Name', 'Email', 'Password', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        <Modal
          showModal={showModal}
          closeModalFn={closeModal}
          acceptModalFn={acceptModal}
          content={selectedItem}
          type={typeModal}
          titleModal={titleModal}
        />
        <h1 className={styles.h1}>Psychologists</h1>
        {isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={psychologists} header={tableHeader} openModal={openModal} />
            <Link to="/psychologists/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD PSYCHOLOGIST</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Psychologists;
