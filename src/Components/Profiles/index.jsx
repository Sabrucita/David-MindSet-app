import { useEffect, useState } from 'react';
import styles from './profiles.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader';

function Profiles() {
  const [showModal, setShowModal] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const url = process.env.REACT_APP_API;

  useEffect(() => {
    fetch(`${url}/profile-types`)
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
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
    fetch(`${url}/profile-types/${selectedItem.id}`, {
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
        <h1 className={styles.h1}>Profile Types</h1>
        {isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={profiles} header={tableHeader} openModal={openModal} />
            <Link to="/profiles/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD PROFILE</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Profiles;
