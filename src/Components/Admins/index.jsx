import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';

function Admins() {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();

  const url = process.env.REACT_APP_API;
  //Get app info from DB
  useEffect(() => {
    fetch(`${url}/administrators`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response);
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
    fetch(`${url}/administrators/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setAdmins(
          admins.filter((app) => {
            return app._id !== selectedItem.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const tableHeader = ['First Name', 'Last Name', 'Email', 'Password', 'Actions'];

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
        <h1 className={styles.h1}>Admins</h1>
        <List data={admins} header={tableHeader} openModal={openModal} />
        <Link to="/admins/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>ADD ADMIN</span>
        </Link>
      </section>
    </div>
  );
}

export default Admins;