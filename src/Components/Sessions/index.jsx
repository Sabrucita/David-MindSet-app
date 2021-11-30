import { useState, useEffect } from 'react';
import List from './List';
import Modal from './Modal';
import styles from './sessions.module.css';

const url = process.env.REACT_APP_API;

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${url}/sessions`)
      .then((res) => res.json())
      .then((data) => {
        setSessions(data.data);
      });
  }, []);

  const deleteItem = (selectedItem) => {
    fetch(`${url}/sessions/${selectedItem}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          setShowModal(false);
          const sessionsUpdated = sessions.filter((session) => session._id !== selectedItem);
          setSessions(sessionsUpdated);
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch(() => {
        setShowModal(true);
        setModalType('error');
      });
  };

  const closeModalFn = () => {
    setShowModal(false);
  };

  const addSession = () => {
    localStorage.setItem('operation', 'create');
    localStorage.setItem('id', '');
    window.location.href = 'sessions/form';
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Sessions</h2>
        <List
          sessions={sessions}
          setSessions={setSessions}
          modalContent={setModalContent}
          setModalType={setModalType}
          setShowModal={setShowModal}
        />
        <button className={styles.createBtn} onClick={addSession}>
          ADD SESSION
        </button>
      </section>
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        acceptModalFn={deleteItem}
        closeModalFn={closeModalFn}
      />
    </>
  );
}

export default Sessions;
