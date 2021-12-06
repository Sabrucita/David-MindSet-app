import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from './List';
import Modal from '../shared/Modal';
import Preloader from '../shared/Preloader';
import styles from './sessions.module.css';

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const url = process.env.REACT_APP_API;
  const tableHeader = ['Candidate', 'Psychologist', 'Date', 'Action'];

  useEffect(() => {
    fetch(`${url}/sessions`)
      .then((res) => res.json())
      .then((data) => {
        setSessions(data);
        setIsFetching(false);
      })
      .catch((err) => {
        showErrorMsg(err);
      });
  }, []);

  const deleteItem = () => {
    fetch(`${url}/sessions/${selectedItem.id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          setShowModal(false);
          const sessionsUpdated = sessions.filter((session) => session._id !== selectedItem.id);
          setSessions(sessionsUpdated);
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
      });
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    setModalType(type);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModalFn = () => {
    setShowModal(false);
  };

  const showErrorMsg = (data) => {
    setModalType('error');
    setModalTitle('Upsss an error has happened');
    setSelectedItem(data);
    setShowModal(true);
  };

  return (
    <>
      <section className={styles.container}>
        <h1 className="mainTitle">Sessions</h1>
        {isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={sessions} header={tableHeader} openModal={openModal} />
            <Link to="/sessions/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD SESSION</span>
            </Link>
          </>
        )}
      </section>
      <Modal
        showModal={showModal}
        type={modalType}
        titleModal={modalTitle}
        content={selectedItem}
        closeModalFn={closeModalFn}
        acceptModalFn={deleteItem}
      />
    </>
  );
}

export default Sessions;
