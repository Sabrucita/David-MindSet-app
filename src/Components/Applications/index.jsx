import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();

  const url = process.env.REACT_APP_API;
  //Get app info from DB
  useEffect(() => {
    fetch(`${url}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response);
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
    fetch(`${url}/applications/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setApplications(
          applications.filter((app) => {
            return app._id !== selectedItem.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const tableHeader = ['Candidate', 'Open Position', 'Status', 'Action'];

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
        <h1 className={styles.h1}>Applications</h1>
        <List data={applications} header={tableHeader} openModal={openModal} />
        <Link to="/applications/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>ADD APPLICATION</span>
        </Link>
      </section>
    </div>
  );
}

export default Applications;
