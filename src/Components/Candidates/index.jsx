import { useEffect, useState } from 'react';
import styles from './candidates.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader';

function Candid() {
  const [showModal, setShowModal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const url = process.env.REACT_APP_API;

  useEffect(() => {
    fetch(`${url}/candidates`)
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
        setIsFetching(false);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    setTypeModal(type);
    setTitleModal(title);
    setShowModal(true);
  };

  const acceptModal = () => {
    fetch(`${url}/candidates/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setCandidates(
          candidates.filter((app) => {
            return app._id !== selectedItem.id;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const tableHeader = [
    'First Name',
    'Last Name',
    'Phone',
    'Email',
    'Country',
    'Province',
    'City',
    'Postal Code',
    'Address',
    'Birthday',
    'Actions'
  ];

  return (
    <>
      <Modal
        showModal={showModal}
        closeModalFn={closeModal}
        acceptModalFn={acceptModal}
        content={selectedItem}
        type={typeModal}
        titleModal={titleModal}
      />
      <section className={styles.container}>
        <h1 className={styles.h1}>Candidates</h1>
        {isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={candidates} header={tableHeader} openModal={openModal} />
            <Link to="/candidates/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}> ADD CANDIDATE</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}
export default Candid;
