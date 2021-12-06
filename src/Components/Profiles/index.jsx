import { useEffect, useState } from 'react';
import styles from './profiles.module.css';
import List from './List';
import Modal from './Modal';

function Profiles() {
  const [showModal, setShowModal] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();

  //Get app info from DB
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/profile-types`)
      .then((response) => response.json())
      .then((response) => {
        setProfiles(response);
      });
  }, []);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = (item, type) => {
    setSelectedItem(item);
    setTypeModal(type);
    setShowModal(true);
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    fetch(`${process.env.REACT_APP_API}/profile-types/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setProfiles(
          profiles.filter((app) => {
            return app._id !== selectedItem.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const tableHeader = ['Name Profile', 'Action'];

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <Modal
          show={showModal}
          closeModal={closeModal}
          acceptModal={acceptModal}
          content={selectedItem}
          type={typeModal}
        />
        <h1>Profile Types</h1>
        <List
          data={profiles}
          header={tableHeader}
          openModal={openModal}
          acceptModal={acceptModal}
        />
        <a href="/profiles/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>Add</span>
        </a>
      </section>
    </div>
  );
}

export default Profiles;
